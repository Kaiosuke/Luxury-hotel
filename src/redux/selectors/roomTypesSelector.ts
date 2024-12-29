import { createSelector } from "@reduxjs/toolkit";
import { IRoomTypeState } from "../slices/roomTypesSlice";
import { RootState } from "../store";

interface IFilter {
  sort: string;
  views: string[];
  features: string[];
  categories: string[];
}

const roomTypesSelector = (state: RootState): IRoomTypeState =>
  state.roomTypesSlice;

const roomTypesFilterSelector = (state: RootState): IFilter =>
  state.roomTypesSlice.filters;

const roomTypesRemainingSelector = createSelector(
  roomTypesSelector,
  roomTypesFilterSelector,
  (rooms, filter) => {
    if (!rooms.roomTypes) return [];
    return rooms.roomTypes
      .filter((room) => {
        const matchesView = filter.views.length
          ? filter.views.includes(room.view)
          : true;

        const matchesCategory = filter.categories.length
          ? filter.categories.includes(room.category)
          : true;

        const matchesFeatures = filter.features.length
          ? room.detailFeatures.some((feature: string) =>
              filter.features.includes(feature)
            )
          : true;

        return matchesView && matchesCategory && matchesFeatures;
      })
      .sort((a, b) => {
        switch (filter.sort) {
          case "recommended":
            return 0;
          case "rate":
            return b.rate - a.rate;
          case "low":
            return a.rate - b.rate;
          case "high":
            return b.rate - a.rate;
          default:
            return 0;
        }
      });
  }
);

export {
  roomTypesSelector,
  roomTypesFilterSelector,
  roomTypesRemainingSelector,
};
