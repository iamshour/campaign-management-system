//#region Import
import { lazy } from "react"

import type { IconType } from "@/ui"
//#endregion

export enum IndustryIconEnum {
	"IcRoundShoppingCart" = "IcRoundShoppingCart",
	"SolarShop2Bold" = "SolarShop2Bold",
	"IcRoundShopify" = "IcRoundShopify",
	"ZondiconsLocationFood" = "ZondiconsLocationFood",
	"MaterialSymbolsFastfoodSharp" = "MaterialSymbolsFastfoodSharp",
	"IcBaselineFoodBank" = "IcBaselineFoodBank",
	"MaterialSymbolsSelfCare" = "MaterialSymbolsSelfCare",
	"MaterialSymbolsLightHealthAndBeautySharp" = "MaterialSymbolsLightHealthAndBeautySharp",
	"IconParkSolidBarberBrush" = "IconParkSolidBarberBrush",
	"StreamlineMedicalCrossSignHealthcareSolid" = "StreamlineMedicalCrossSignHealthcareSolid",
	"StreamlineHealthCare2Solid" = "StreamlineHealthCare2Solid",
	"IconoirHealthcare" = "IconoirHealthcare",
	"ZondiconsEducation" = "ZondiconsEducation",
	"StreamlineQualityEducationSolid" = "StreamlineQualityEducationSolid",
	"MdiAccountSchool" = "MdiAccountSchool",
	"StreamlineTravelHotelServingDomeHandPorterServiceRoomPlateHandBellhopPlatterGiveFood" = "StreamlineTravelHotelServingDomeHandPorterServiceRoomPlateHandBellhopPlatterGiveFood",
	"StreamlineTravelHotelBellServiceConciergePorterCallRingBellhopBellReception" = "StreamlineTravelHotelBellServiceConciergePorterCallRingBellhopBellReception",
	"MaterialSymbolsLightTravelLuggageAndBags" = "MaterialSymbolsLightTravelLuggageAndBags",
	"MaterialSymbolsStarsRounded" = "MaterialSymbolsStarsRounded",
	"IconoirThreeStarsSolid" = "IconoirThreeStarsSolid",
	"SolarHandStarsBold" = "SolarHandStarsBold",
	"MaterialSymbolsLightRealEstateAgent" = "MaterialSymbolsLightRealEstateAgent",
	"FluentRealEstate24Filled" = "FluentRealEstate24Filled",
	"RiPresentationLine" = "RiPresentationLine",
	"EmojioneMonotoneArtistPalette" = "EmojioneMonotoneArtistPalette",
	"MaterialSymbolsBusinessCenterRounded" = "MaterialSymbolsBusinessCenterRounded",
	"IconParkSolidUserBusiness" = "IconParkSolidUserBusiness",
	"IconParkSolidLocal" = "IconParkSolidLocal",
	"FluentPeopleCommunity16Filled" = "FluentPeopleCommunity16Filled",
	"FluentHandshake16Filled" = "FluentHandshake16Filled",
}

const industriesIconsMap: Record<IndustryIconEnum, React.LazyExoticComponent<IconType>> = {
	EmojioneMonotoneArtistPalette: lazy(() => import("~icons/emojione-monotone/artist-palette")),
	FluentHandshake16Filled: lazy(() => import("~icons/fluent/handshake-16-filled")),
	FluentPeopleCommunity16Filled: lazy(() => import("~icons/fluent/people-community-16-filled")),
	FluentRealEstate24Filled: lazy(() => import("~icons/fluent/real-estate-24-filled")),
	IcBaselineFoodBank: lazy(() => import("~icons/ic/baseline-food-bank")),
	IcRoundShopify: lazy(() => import("~icons/ic/round-shopify")),
	IcRoundShoppingCart: lazy(() => import("~icons/ic/round-shopping-cart")),
	IconParkSolidBarberBrush: lazy(() => import("~icons/icon-park-solid/barber-brush")),
	IconParkSolidUserBusiness: lazy(() => import("~icons/icon-park-solid/user-business")),
	IconoirHealthcare: lazy(() => import("~icons/iconoir/healthcare")),
	MaterialSymbolsFastfoodSharp: lazy(() => import("~icons/material-symbols/fastfood-sharp")),
	SolarShop2Bold: lazy(() => import("~icons/solar/shop-2-bold")),
	ZondiconsLocationFood: lazy(() => import("~icons/zondicons/location-food")),
	MaterialSymbolsSelfCare: lazy(() => import("~icons/material-symbols/self-care")),
	MaterialSymbolsLightHealthAndBeautySharp: lazy(() => import("~icons/material-symbols-light/health-and-beauty-sharp")),
	StreamlineMedicalCrossSignHealthcareSolid: lazy(
		() => import("~icons/streamline/medical-cross-sign-healthcare-solid")
	),
	StreamlineHealthCare2Solid: lazy(() => import("~icons/streamline/health-care-2-solid")),
	ZondiconsEducation: lazy(() => import("~icons/zondicons/education")),
	StreamlineQualityEducationSolid: lazy(() => import("~icons/streamline/quality-education-solid")),
	MdiAccountSchool: lazy(() => import("~icons/mdi/account-school")),
	StreamlineTravelHotelServingDomeHandPorterServiceRoomPlateHandBellhopPlatterGiveFood: lazy(
		() =>
			import(
				"~icons/streamline/travel-hotel-serving-dome-hand-porter-service-room-plate-hand-bellhop-platter-give-food"
			)
	),
	StreamlineTravelHotelBellServiceConciergePorterCallRingBellhopBellReception: lazy(
		() => import("~icons/streamline/travel-hotel-bell-service-concierge-porter-call-ring-bellhop-bell-reception")
	),
	MaterialSymbolsLightTravelLuggageAndBags: lazy(() => import("~icons/material-symbols-light/travel-luggage-and-bags")),
	MaterialSymbolsStarsRounded: lazy(() => import("~icons/material-symbols/stars-rounded")),
	IconoirThreeStarsSolid: lazy(() => import("~icons/iconoir/three-stars-solid")),
	SolarHandStarsBold: lazy(() => import("~icons/solar/hand-stars-bold")),
	MaterialSymbolsLightRealEstateAgent: lazy(() => import("~icons/material-symbols-light/real-estate-agent")),
	RiPresentationLine: lazy(() => import("~icons/ri/presentation-line")),
	MaterialSymbolsBusinessCenterRounded: lazy(() => import("~icons/material-symbols/business-center-rounded")),
	IconParkSolidLocal: lazy(() => import("~icons/icon-park-solid/local")),
}

export default industriesIconsMap
