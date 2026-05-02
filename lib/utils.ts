import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TEST_GROUPS } from "./constants-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const createPanelRegistry = () => {
  const registry: Record<string, Record<string, () => Promise<any>>> = {};

  for (const group of TEST_GROUPS) {
    const key = group.title.toLowerCase().replace(/\s+/g, "");

    registry[key] = {};

    for (const test of group.tests) {
      registry[key][test.id] = () => import(`@/data/tests/${key}/${test.id}`);
    }
  }

  return registry;
};

export const PANEL_REGISTRY = createPanelRegistry();
