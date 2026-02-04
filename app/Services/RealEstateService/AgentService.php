<?php

namespace App\Services\RealEstateService;

use App\Facades\FileService\UploadService;
use App\Models\Agent;
use App\Models\Block;
use App\Services\WebsiteService\BlockService;

class AgentService extends BlockService
{
    public function mapBlockModel(Block $block): array
    {
        $agent = $block->agent()->first();
        return [
            ...parent::mapBlockModel($block),
            'email' => $agent->email,
            'phone' => $agent->phone,
        ];
    }

    public function mapLocaleBlock(Block $block): array
    {
        $agent = $block->agent()->first();
        return [
            ...parent::mapLocaleBlock($block),
            'email' => $agent->email,
            'phone' => $agent->phone,
        ];
    }
    private function fillAgentForm(Agent &$agent, int $blockId): void
    {
        $data = request()->all();
        $agent->fill([
            'block_id' => $blockId,
            'email' => $data['email'],
            'phone' => $data['phone'],
        ]);
    }

    public function storeBlock($data): array
    {
        $block = new Block();
        $this->fillBlockForm($block);
        $block->save();
        //Store Translations:
        $this->storeTranslations($data, $block);
        //Store Files:
        //        2. Store File:
        if (array_key_exists('image', $data)) {
            $data['refId'] = $block->id;
            $data['refType'] = $this->reference;
            UploadService::saveFile($data, 'image', 'block');
        }

        $agent = new Agent();
        $this->fillAgentForm($agent, $block->id);
        $agent->save();
        return $this->mapBlockModel($block);
    }

    public function updateTranslations($data, Block $block): ?Block
    {
        parent::updateTranslations($data, $block);
        $agent = $block->agent()->first();
        if (is_null($agent)) {
            return null;
        }
        $this->fillAgentForm($agent, $block->id);
        $agent->update();
        return Block::query()->where('id', $block->id)->first();
    }

}
