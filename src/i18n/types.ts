import type common from "./en-common.json";
import type home from "./en-home.json";
export type CommonCopy = typeof common;
export type HomeCopy = typeof home;
export type Dictionary = { common: CommonCopy; home: HomeCopy };
