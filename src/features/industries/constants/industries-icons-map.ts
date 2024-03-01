//#region Import
import type { IconType } from "@/ui"

import { lazy } from "react"
//#endregion

export enum IndustryIconEnum {
	"EmojioneMonotoneArtistPalette" = "EmojioneMonotoneArtistPalette",
	"FluentHandshake16Filled" = "FluentHandshake16Filled",
	"FluentPeopleCommunity16Filled" = "FluentPeopleCommunity16Filled",
	"FluentRealEstate24Filled" = "FluentRealEstate24Filled",
	"FluentWrenchSettings24Regular" = "FluentWrenchSettings24Regular",
	"IcBaselineFoodBank" = "IcBaselineFoodBank",
	"IconoirHealthcare" = "IconoirHealthcare",
	"IconoirThreeStarsSolid" = "IconoirThreeStarsSolid",
	"IconParkSolidBarberBrush" = "IconParkSolidBarberBrush",
	"IconParkSolidLocal" = "IconParkSolidLocal",
	"IconParkSolidUserBusiness" = "IconParkSolidUserBusiness",
	"IcRoundShopify" = "IcRoundShopify",
	"IcRoundShoppingCart" = "IcRoundShoppingCart",
	"MaterialSymbolsBusinessCenterRounded" = "MaterialSymbolsBusinessCenterRounded",
	"MaterialSymbolsFastfoodSharp" = "MaterialSymbolsFastfoodSharp",
	"MaterialSymbolsLightHealthAndBeautySharp" = "MaterialSymbolsLightHealthAndBeautySharp",
	"MaterialSymbolsLightRealEstateAgent" = "MaterialSymbolsLightRealEstateAgent",
	"MaterialSymbolsLightTravelLuggageAndBags" = "MaterialSymbolsLightTravelLuggageAndBags",
	"MaterialSymbolsSelfCare" = "MaterialSymbolsSelfCare",
	"MaterialSymbolsStarsRounded" = "MaterialSymbolsStarsRounded",
	"MdiAccountSchool" = "MdiAccountSchool",
	"RiPresentationLine" = "RiPresentationLine",
	"SolarHandStarsBold" = "SolarHandStarsBold",
	"SolarShop2Bold" = "SolarShop2Bold",
	"StreamlineHealthCare2Solid" = "StreamlineHealthCare2Solid",
	"StreamlineMedicalCrossSignHealthcareSolid" = "StreamlineMedicalCrossSignHealthcareSolid",
	"StreamlineQualityEducationSolid" = "StreamlineQualityEducationSolid",
	"StreamlineTravelHotelBellServiceConciergePorterCallRingBellhopBellReception" = "StreamlineTravelHotelBellServiceConciergePorterCallRingBellhopBellReception",
	"StreamlineTravelHotelServingDomeHandPorterServiceRoomPlateHandBellhopPlatterGiveFood" = "StreamlineTravelHotelServingDomeHandPorterServiceRoomPlateHandBellhopPlatterGiveFood",
	"ZondiconsEducation" = "ZondiconsEducation",
	"ZondiconsLocationFood" = "ZondiconsLocationFood",
}

const industriesIconsMap: Record<IndustryIconEnum, React.LazyExoticComponent<IconType>> = {
	EmojioneMonotoneArtistPalette: lazy(() => import("~icons/emojione-monotone/artist-palette")),
	FluentHandshake16Filled: lazy(() => import("~icons/fluent/handshake-16-filled")),
	FluentPeopleCommunity16Filled: lazy(() => import("~icons/fluent/people-community-16-filled")),
	FluentRealEstate24Filled: lazy(() => import("~icons/fluent/real-estate-24-filled")),
	FluentWrenchSettings24Regular: lazy(() => import("~icons/fluent/wrench-settings-24-regular")),
	IcBaselineFoodBank: lazy(() => import("~icons/ic/baseline-food-bank")),
	IconoirHealthcare: lazy(() => import("~icons/iconoir/healthcare")),
	IconoirThreeStarsSolid: lazy(() => import("~icons/iconoir/three-stars-solid")),
	IconParkSolidBarberBrush: lazy(() => import("~icons/icon-park-solid/barber-brush")),
	IconParkSolidLocal: lazy(() => import("~icons/icon-park-solid/local")),
	IconParkSolidUserBusiness: lazy(() => import("~icons/icon-park-solid/user-business")),
	IcRoundShopify: lazy(() => import("~icons/ic/round-shopify")),
	IcRoundShoppingCart: lazy(() => import("~icons/ic/round-shopping-cart")),
	MaterialSymbolsBusinessCenterRounded: lazy(() => import("~icons/material-symbols/business-center-rounded")),
	MaterialSymbolsFastfoodSharp: lazy(() => import("~icons/material-symbols/fastfood-sharp")),
	MaterialSymbolsLightHealthAndBeautySharp: lazy(() => import("~icons/material-symbols-light/health-and-beauty-sharp")),
	MaterialSymbolsLightRealEstateAgent: lazy(() => import("~icons/material-symbols-light/real-estate-agent")),
	MaterialSymbolsLightTravelLuggageAndBags: lazy(() => import("~icons/material-symbols-light/travel-luggage-and-bags")),
	MaterialSymbolsSelfCare: lazy(() => import("~icons/material-symbols/self-care")),
	MaterialSymbolsStarsRounded: lazy(() => import("~icons/material-symbols/stars-rounded")),
	MdiAccountSchool: lazy(() => import("~icons/mdi/account-school")),
	RiPresentationLine: lazy(() => import("~icons/ri/presentation-line")),
	SolarHandStarsBold: lazy(() => import("~icons/solar/hand-stars-bold")),
	SolarShop2Bold: lazy(() => import("~icons/solar/shop-2-bold")),
	StreamlineHealthCare2Solid: lazy(() => import("~icons/streamline/health-care-2-solid")),
	StreamlineMedicalCrossSignHealthcareSolid: lazy(
		() => import("~icons/streamline/medical-cross-sign-healthcare-solid")
	),
	StreamlineQualityEducationSolid: lazy(() => import("~icons/streamline/quality-education-solid")),
	StreamlineTravelHotelBellServiceConciergePorterCallRingBellhopBellReception: lazy(
		() => import("~icons/streamline/travel-hotel-bell-service-concierge-porter-call-ring-bellhop-bell-reception")
	),
	StreamlineTravelHotelServingDomeHandPorterServiceRoomPlateHandBellhopPlatterGiveFood: lazy(
		() =>
			import(
				"~icons/streamline/travel-hotel-serving-dome-hand-porter-service-room-plate-hand-bellhop-platter-give-food"
			)
	),
	ZondiconsEducation: lazy(() => import("~icons/zondicons/education")),
	ZondiconsLocationFood: lazy(() => import("~icons/zondicons/location-food")),
}

export default industriesIconsMap
