import {configureStore} from "@reduxjs/toolkit";
import UserReducer from "@/Redux/Reducers/UserSlice/UserSlice";
import AccountReducer from "@/Redux/Reducers/AccountSlice/AccountSlice";
import LanguageReducer from "@/Redux/Reducers/LanguageSlice/LanguageSlice";
import ThemeReducer from "@/Redux/Reducers/ThemeSlice/ThemeSlice";
import SiteThemeReducer from "@/Redux/Reducers/ThemeSlice/SiteThemeSlice";
import SpinnerReducer from "@/Redux/Reducers/SpinnerSlice/SpinnerSlice";
import SiteSidebarReducer from "@/Redux/Reducers/SiteSidebar/SiteSidebarSlice";
import CartReducer from "@/Redux/Reducers/CartSlice/CartSlice";
import MapReducer from "@/Redux/Reducers/MapSlice/MapSlice";
import LocaleProductReducer from "@/Redux/Reducers/LocaleProductSlice/LocaleProductSlice";
import CouponReducer from "@/Redux/Reducers/CouponSlice/CouponSlice";

export const store = configureStore({
    reducer: {
        user: UserReducer,
        accounts: AccountReducer,
        languages: LanguageReducer,
        theme: ThemeReducer,
        siteTheme: SiteThemeReducer,
        spinner: SpinnerReducer,
        siteSidebar: SiteSidebarReducer,
        cart: CartReducer,
        map: MapReducer,
        products: LocaleProductReducer,
        coupon: CouponReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
