<?php

namespace App\Services\UserService;

use App\Models\Admin;
use App\Models\User;
use App\Services\FileService\FileService;
use App\Services\FileService\UploadService;
use Carbon\Carbon;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserService
{
    protected array $data;
    protected int $id;

    const HOME = "";

    private $default_avatar = 'default.png';
    private string $imageContainer = 'users';
    private string $reference = 'Modules\User\Entities\User';


    public function __construct()
    {
        $this->data = request()->all();
//        $this->imageContainer = 'users';
//        $this->reference = 'Modules\User\Entities\User';
    }

    protected function mapUserModel(User $user) {
//        $avatar = Storage::disk('public')->exists('users/' .$user->avatar) ? $user->avatar : $this->default_avatar;
        $avatar = $user->avatar()->first()->url ?? $this->default_avatar;

        $userModel = [
            'id' => $user->id,
            'email' => $user->email,
            'avatar' => $avatar,
            'isActive' => (bool)$user->is_active,
            'createdAt' => Carbon::make($user->created_at)->format('M d, Y'),
        ];

//        return [...$userModel, ...$this->getUserActivities($user)];
        return $userModel;

    }

//    protected function getUserActivities(User $user) {
//        if ($user->userable()->first() instanceof Admin) {
//            return [];
//        }
//
//        else {
//            if ($user instanceof IUserProductActivities && !($user->userable()->first() instanceof Admin)) {
//                $likesModel = UserProductService::getLikes($user->likes()->get());
//                $favoritesModel = UserProductService::getFavorites($user->favorites()->get());
//                $reviewsModel = UserProductService::getReviews($user->reviews()->get());
//                $ratingsModel = UserProductService::getRatings($user->rates()->get());
//
//                return [
//                    'likes' => $likesModel,
//                    'favorites' => $favoritesModel,
//                    'reviews' => $reviewsModel,
//                    'ratings' => $ratingsModel
//                ];
//            }
//            else return [];
//        }
//    }

    protected function getAvatar(User $user) {
        return $user->avatar()->first()->url ?? $this->default_avatar;
    }

    public function mapUserShort(User $user) {
//        dd($user->avatar()->first());
        return [
//            'name' => $user->userable()->first()->name,
            'avatar' => $user->avatar()->first()->url??$this->default_avatar,
        ];
    }

    protected function validator(): \Illuminate\Validation\Validator
    {
        return Validator::make($this->data, [
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);
    }

    /**
     *
     */
//    protected function store() {
//        $user = User::create([
//            'reference_id' => $this->id,
//            'reference_type' => get_class($this)::TYPE,
//            'email' => $this->data['email'],
//            'password' => Hash::make($this->data['password']),
//            'is_active' => 1,
//            'avatar' => $this->default_avatar,
//        ]);
//
//        if (array_key_exists('avatar', $this->data)) {
//            $user->avatar = FileService::storeFile($this->data, 'avatar', 'users');
//        }
//        $user->save();
//        Auth::login($user);
//        event(new UserRegistrationEvent($this->getName($user), $user->email));
//    }

//    public function validateEmail($email) {
//       return User::query()->where('email', $email)->first();
//    }
//
//    public function update(FormRequest $request): void
//    {
//        $request->user()->fill($request->validated());
//        if ($request->user()->isDirty('email')) {
//            $request->user()->email_verified_at = null;
//        }
//
//        $request->user()->update();
//    }

    public function getHome() {
        return app()->getLocale() . get_class($this)::HOME;
    }

    public function uploadProfile($data) {
        $user = Auth::user();

        $avatar = $user->avatar()->first();
        $data['refId'] = $user->id;
        $data['refType'] = $this->reference;
        if (is_null($avatar)) {
            UploadService::saveFile($data, 'avatar', $this->imageContainer);
        } else {
            UploadService::updateFile($avatar->id, 'avatar', $this->imageContainer);
        }

//        if ($user->avatar !== $this->default_avatar) {
//            FileService::deleteFile($user->avatar, 'users');
//        }
//
//        $filename = FileService::storeFile($data, 'avatar', 'users');
//        $user->avatar = $filename;
//        $user->update();
//        return $filename;
    }

    public function updatePassword(string $password) {
        Auth::user()->update([
            'password' => Hash::make($password),
        ]);
    }

    public function getName(User $user) {
        return get_class($this);
    }

    protected function getUsers(string $class, $limit = 0, $offset = 0) {
        if ($limit <= 0) {
            return User::query()
                ->where('userable_type', $class)
                ->limit(config('app.listLimit'))
                ->offset($offset)
                ->get();
        }
        else {
            return User::query()
                ->where('userable_type', $class)
                ->limit($limit)
                ->offset($offset)
                ->get();
        }
    }

    public function activateUser($data, $user) {
        $user->is_active = $data['status'];
        $user->update();
    }

//    public function activateReview($reviewId, $status) {
//        return UserProductService::activateReview($reviewId, $status);
//    }
}
