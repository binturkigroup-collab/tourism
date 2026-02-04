<?php

namespace App\Http\Controllers\Admin;

use App\Facades\WebsiteService\MenuService;
use App\Models\Menu;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class MenuController extends Controller
{
    public function index() {
        return response()->json(MenuService::getMenus());
    }

    public function getMenus($category): \Inertia\Response
    {
        $menus = MenuService::getMenusByCategory($category);
        return Inertia::render('Admin/Website/Links/MenuContainer', [
            'menus' => $menus,
            'category' => $category,
        ]);
    }

    public function create(string $category): \Inertia\Response
    {
        $menus = MenuService::getMenusByCategory($category);
        return Inertia::render('Admin/Website/Links/Partials/MenuAdd', [
            'menus' => $menus,
            'category' => $category,
        ]);
    }

    public function store(): JsonResponse
    {
        try {
            $data = request()->all();
            $menuModel = MenuService::storeMenu($data);
//            return response()->json([
//                'status' => 'success',
//                'message' => 'MenuLink Added Successfully',
//                'menu' => $menuModel,
//            ]);
            return \response()->json($menuModel);

        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show() {}

    public function edit(Menu $menu): \Inertia\Response
    {
        $menuModel = MenuService::mapMenuModel($menu);
        $menus = MenuService::getMenusByCategory($menu->category);
        return Inertia::render('Admin/Website/Links/Partials/MenuUpdate', [
            'menus' => $menus,
            'menu' => $menuModel,
            'category' => $menu->category,
        ]);
    }

    public function uploadFile(Request $request, Menu $menu) {
        try {
            $data = $request->all();
            $menuModel = MenuService::updateFile($data, $menu);
            return \response()->json($menuModel);

        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function menuActivation(Request $request, Menu $menu) {
        try {
            $data = $request->all();
            $menuModel = MenuService::menuActivation($data, $menu);
            return \response()->json($menuModel);

        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, Menu $menu): JsonResponse
    {
        try{
            $data = $request->all();
            $menuModel = MenuService::updateMenu($data, $menu);
            return \response()->json($menuModel);
//            return response()->json([
//                'status' => 'success',
//                'message' => 'MenuLink Updated Successfully',
//                'menu' => $menuModel,
//            ]);
        }
        catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Menu $menu) {
        try {
            MenuService::deleteMenu($menu);
            return response()->json([
                'status' => 'success',
                'message' => 'MenuLink Deleted Successfully',
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function reorder($category) {
        $links = MenuService::getMenusByCategory($category);
        return Inertia::render('Admin/Website/Links/Partials/MenuReorder', [
            'menu' => $links,
            'category' => $category,
        ]);
    }

    public function storeReorder(Request $request): JsonResponse
    {
        $data = $request->all();
        try {
            MenuService::reorderList($data);
            return \response()->json([
                'status' => 'success',
                'message' => 'List has been ordered!',
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error while reordering list',
                'details' => $exception->getMessage(),
            ], \Symfony\Component\HttpFoundation\Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
