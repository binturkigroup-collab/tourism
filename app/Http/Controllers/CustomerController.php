<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;

use \Symfony\Component\HttpFoundation\Response as HttpResponse;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
//    public function index(): Response
//    {
////        dd('HERE');
////        $customers = NormalService::getCustomers();
//        $count = NormalService::getCustomersCount();
//        return Inertia::render('Admin/Customer/Customer', [
////            'customers' => $customers,
//            'count' => $count,
//        ]);
//    }

//    public function list(Request $request): JsonResponse {
//        $customers = NormalService::getCustomers();
//        return \response()->json($customers);
//    }

//    public function count(): JsonResponse
//    {
////        dd('JERE');
//        return \response()->json(NormalService::getCustomersCount());
//    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        return view('user::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        return view('user::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Response
     */
//    public function edit(User $user)
//    {
//        return Inertia::render('Admin/Customer/Partials/CustomerUpdate', [
//            'customer' => NormalService::mapUserModel($user),
//        ]);
//    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($id)
    {
        //
    }

//    public function activate(Request $request, User $user) {
//        try {
//            $data = $request->all();
//            UserService::activateUser($data, $user);
//            return \response()->json(NormalService::mapUserModel($user));
//        } catch (\Exception $exception) {
//            return \response()->json([
//                'status' => 'error',
//                'message' => 'Something happened while changing user status',
//                'details' => $exception->getMessage(),
//            ]);
//        }
//    }

    public function activities(User $user) {
        return response()->json(ProductService::getUserProductsActivities($user));
    }

    public function orders(User $user) {
        return \response()->json(OrderService::getOrdersByUser($user->id), HttpResponse::HTTP_OK);
    }

    public function review(Request $request) {
        $data = $request->all();
        $review = NormalService::activateReview($data['reviewId'], $data['status']);
        if (is_null($review)) return \response()->json([
            'status' => 'error',
            'message' => 'review is not exist!',
        ]); else return \response()->json($review);
    }
}
