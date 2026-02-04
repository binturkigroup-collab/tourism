class UserShort {
    // id: number;
    name: string;
    avatar: string;
    type: string;
    // review: string;
    // createdAt: string;
}

export default UserShort;

export type UserActivity = UserShort & {updatedAt: string}
export type UserRating = UserActivity & {rating: number}
export type UserReview = UserActivity & {reviewId: number, review: string, isActive: boolean}
