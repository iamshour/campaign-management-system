//#region Import
import type { IconType } from "@/ui"

import { lazy } from "react"
//#endregion

export enum IndustryIconEnum {
	"EMOJIONE_MONOTONE_ARTIST_PALETTE" = "EMOJIONE_MONOTONE_ARTIST_PALETTE",
	"FLUENT_HANDSHAKE_16_FILLED" = "FLUENT_HANDSHAKE_16_FILLED",
	"FLUENT_PEOPLE_COMMUNITY_16_FILLED" = "FLUENT_PEOPLE_COMMUNITY_16_FILLED",
	"FLUENT_REAL_ESTATE_24_FILLED" = "FLUENT_REAL_ESTATE_24_FILLED",
	"FLUENT_WRENCH_SETTINGS_24_REGULAR" = "FLUENT_WRENCH_SETTINGS_24_REGULAR",
	"IC_BASELINE_FOOD_BANK" = "IC_BASELINE_FOOD_BANK",
	"IC_ROUND_SHOPIFY" = "IC_ROUND_SHOPIFY",
	"IC_ROUND_SHOPPING_CART" = "IC_ROUND_SHOPPING_CART",
	"ICONOIR_HEALTHCARE" = "ICONOIR_HEALTHCARE",
	"ICONOIR_THREE_STARS_SOLID" = "ICONOIR_THREE_STARS_SOLID",
	"ICONPARK_SOLID_BARBER_BRUSH" = "ICONPARK_SOLID_BARBER_BRUSH",
	"ICONPARK_SOLID_LOCAL" = "ICONPARK_SOLID_LOCAL",
	"ICONPARK_SOLID_USER_BUSINESS" = "ICONPARK_SOLID_USER_BUSINESS",
	"MATERIAL_SYMBOLS_BUSINESS_CENTER_ROUNDED" = "MATERIAL_SYMBOLS_BUSINESS_CENTER_ROUNDED",
	"MATERIAL_SYMBOLS_FASTFOOD_SHARP" = "MATERIAL_SYMBOLS_FASTFOOD_SHARP",
	"MATERIAL_SYMBOLS_LIGHT_HEALTH_AND_BEAUTY_SHARP" = "MATERIAL_SYMBOLS_LIGHT_HEALTH_AND_BEAUTY_SHARP",
	"MATERIAL_SYMBOLS_LIGHT_REAL_ESTATE_AGENT" = "MATERIAL_SYMBOLS_LIGHT_REAL_ESTATE_AGENT",
	"MATERIAL_SYMBOLS_LIGHT_TRAVEL_LUGGAGE_AND_BAGS" = "MATERIAL_SYMBOLS_LIGHT_TRAVEL_LUGGAGE_AND_BAGS",
	"MATERIAL_SYMBOLS_SELF_CARE" = "MATERIAL_SYMBOLS_SELF_CARE",
	"MATERIAL_SYMBOLS_STARS_ROUNDED" = "MATERIAL_SYMBOLS_STARS_ROUNDED",
	"MDI_ACCOUNT_SCHOOL" = "MDI_ACCOUNT_SCHOOL",
	"RI_PRESENTATION_LINE" = "RI_PRESENTATION_LINE",
	"SOLAR_HAND_STARS_BOLD" = "SOLAR_HAND_STARS_BOLD",
	"SOLAR_SHOP2_BOLD" = "SOLAR_SHOP2_BOLD",
	"STREAMLINE_HEALTH_CARE_2_SOLID" = "STREAMLINE_HEALTH_CARE_2_SOLID",
	"STREAMLINE_MEDICAL_CROSS_SIGN_HEALTHCARE_SOLID" = "STREAMLINE_MEDICAL_CROSS_SIGN_HEALTHCARE_SOLID",
	"STREAMLINE_QUALITY_EDUCATION_SOLID" = "STREAMLINE_QUALITY_EDUCATION_SOLID",
	"STREAMLINE_TRAVEL_HOTEL_BELL_SERVICE_CONCIERGE_PORTER_CALL_RING_BELLHOP_BELL_RECEPTION" = "STREAMLINE_TRAVEL_HOTEL_BELL_SERVICE_CONCIERGE_PORTER_CALL_RING_BELLHOP_BELL_RECEPTION",
	"STREAMLINE_TRAVEL_HOTEL_SERVING_DOME_HAND_PORTER_SERVICE_ROOM_PLATE_HAND_BELLHOP_PLATTER_GIVE_FOOD" = "STREAMLINE_TRAVEL_HOTEL_SERVING_DOME_HAND_PORTER_SERVICE_ROOM_PLATE_HAND_BELLHOP_PLATTER_GIVE_FOOD",
	"ZONDICONS_EDUCATION" = "ZONDICONS_EDUCATION",
	"ZONDICONS_LOCATION_FOOD" = "ZONDICONS_LOCATION_FOOD",
}

const industriesIconsMap: Record<IndustryIconEnum, React.LazyExoticComponent<IconType>> = {
	EMOJIONE_MONOTONE_ARTIST_PALETTE: lazy(() => import("~icons/emojione-monotone/artist-palette")),
	FLUENT_HANDSHAKE_16_FILLED: lazy(() => import("~icons/fluent/handshake-16-filled")),
	FLUENT_PEOPLE_COMMUNITY_16_FILLED: lazy(() => import("~icons/fluent/people-community-16-filled")),
	FLUENT_REAL_ESTATE_24_FILLED: lazy(() => import("~icons/fluent/real-estate-24-filled")),
	FLUENT_WRENCH_SETTINGS_24_REGULAR: lazy(() => import("~icons/fluent/wrench-settings-24-regular")),
	IC_BASELINE_FOOD_BANK: lazy(() => import("~icons/ic/baseline-food-bank")),
	IC_ROUND_SHOPIFY: lazy(() => import("~icons/ic/round-shopify")),
	IC_ROUND_SHOPPING_CART: lazy(() => import("~icons/ic/round-shopping-cart")),
	ICONOIR_HEALTHCARE: lazy(() => import("~icons/iconoir/healthcare")),
	ICONOIR_THREE_STARS_SOLID: lazy(() => import("~icons/iconoir/three-stars-solid")),
	ICONPARK_SOLID_BARBER_BRUSH: lazy(() => import("~icons/icon-park-solid/barber-brush")),
	ICONPARK_SOLID_LOCAL: lazy(() => import("~icons/icon-park-solid/local")),
	ICONPARK_SOLID_USER_BUSINESS: lazy(() => import("~icons/icon-park-solid/user-business")),
	MATERIAL_SYMBOLS_BUSINESS_CENTER_ROUNDED: lazy(() => import("~icons/material-symbols/business-center-rounded")),
	MATERIAL_SYMBOLS_FASTFOOD_SHARP: lazy(() => import("~icons/material-symbols/fastfood-sharp")),
	MATERIAL_SYMBOLS_LIGHT_HEALTH_AND_BEAUTY_SHARP: lazy(
		() => import("~icons/material-symbols-light/health-and-beauty-sharp")
	),
	MATERIAL_SYMBOLS_LIGHT_REAL_ESTATE_AGENT: lazy(() => import("~icons/material-symbols-light/real-estate-agent")),
	MATERIAL_SYMBOLS_LIGHT_TRAVEL_LUGGAGE_AND_BAGS: lazy(
		() => import("~icons/material-symbols-light/travel-luggage-and-bags")
	),
	MATERIAL_SYMBOLS_SELF_CARE: lazy(() => import("~icons/material-symbols/self-care")),
	MATERIAL_SYMBOLS_STARS_ROUNDED: lazy(() => import("~icons/material-symbols/stars-rounded")),
	MDI_ACCOUNT_SCHOOL: lazy(() => import("~icons/mdi/account-school")),
	RI_PRESENTATION_LINE: lazy(() => import("~icons/ri/presentation-line")),
	SOLAR_HAND_STARS_BOLD: lazy(() => import("~icons/solar/hand-stars-bold")),
	SOLAR_SHOP2_BOLD: lazy(() => import("~icons/solar/shop-2-bold")),
	STREAMLINE_HEALTH_CARE_2_SOLID: lazy(() => import("~icons/streamline/health-care-2-solid")),
	STREAMLINE_MEDICAL_CROSS_SIGN_HEALTHCARE_SOLID: lazy(
		() => import("~icons/streamline/medical-cross-sign-healthcare-solid")
	),
	STREAMLINE_QUALITY_EDUCATION_SOLID: lazy(() => import("~icons/streamline/quality-education-solid")),
	STREAMLINE_TRAVEL_HOTEL_BELL_SERVICE_CONCIERGE_PORTER_CALL_RING_BELLHOP_BELL_RECEPTION: lazy(
		() => import("~icons/streamline/travel-hotel-bell-service-concierge-porter-call-ring-bellhop-bell-reception")
	),
	STREAMLINE_TRAVEL_HOTEL_SERVING_DOME_HAND_PORTER_SERVICE_ROOM_PLATE_HAND_BELLHOP_PLATTER_GIVE_FOOD: lazy(
		() =>
			import(
				"~icons/streamline/travel-hotel-serving-dome-hand-porter-service-room-plate-hand-bellhop-platter-give-food"
			)
	),
	ZONDICONS_EDUCATION: lazy(() => import("~icons/zondicons/education")),
	ZONDICONS_LOCATION_FOOD: lazy(() => import("~icons/zondicons/location-food")),
}

export default industriesIconsMap
