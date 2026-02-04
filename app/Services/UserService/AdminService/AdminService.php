<?php

namespace App\Services\UserService\AdminService;

use App\Models\Admin;
use App\Models\User;
use App\Services\UserService\UserService;

class AdminService extends UserService
{
    public function mapUserModel(User $user)
    {
        $userInfo = parent::mapUserModel($user);
        $normalInfo = [
            'type' => 'admin',
            'name' => $user->reference()->first()->first_name . ' ' . $user->reference()->first()->last_name,
        ];

        return [...$userInfo, ...$normalInfo];
    }

    public function mapUserShort(User $user)
    {
        $userInfo = parent::mapUserShort($user);
        return [
            ...$userInfo,
            'name' => $user->reference()->first()->first_name . ' ' . $user->reference()->first()->last_name,
        ];
    }

    public function getName(User $user)
    {
        return $user->reference()->first()->first_name . ' ' . $user->reference()->first()->last_name;
        // TODO: Implement getName() method.
    }

    public function getAdmins() {
        $admins = parent::getUsers(Admin::class);
    }
}
