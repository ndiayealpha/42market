import { describe, expect, it } from "vitest";

import { buildLoginUrl, isProtectedRoute, isPublicRoute, resolveCallbackUrl, routes } from "./routes";

describe("routes", () => {
  it("identifies protected routes and their nested paths", () => {
    expect(isProtectedRoute(routes.main.home)).toBe(true);
    expect(isProtectedRoute(routes.main.root)).toBe(true);
    expect(isProtectedRoute(routes.auth.login)).toBe(false);
  });

  it("carves out the global Bons Plans and search pages as public despite being nested under /main", () => {
    expect(isProtectedRoute(routes.main.bonsPlans)).toBe(false);
    expect(isProtectedRoute(routes.main.search)).toBe(false);
    expect(isProtectedRoute(routes.main.notifications)).toBe(true);
    expect(isProtectedRoute(routes.main.favorites)).toBe(true);
  });

  it("carves out Page P (fiche produit) as public despite its dynamic segments", () => {
    expect(isProtectedRoute(routes.main.epicerieProduit("loirivoire", "riz-region-mediterraneenne"))).toBe(false);
  });

  it("carves out the store detail page and its real catalog (rayons) as public, for the 7-page mission's discovery funnel", () => {
    expect(isProtectedRoute(routes.main.epicerieDetail("loirivoire"))).toBe(false);
    expect(isProtectedRoute(routes.main.epicerieRayons("loirivoire"))).toBe(false);
    expect(isProtectedRoute(routes.main.epicerieRayon("loirivoire", "feculents"))).toBe(false);
    // The per-store bons-plans page keeps requiring a session — no discovery need asked for it yet.
    expect(isProtectedRoute(routes.main.epicerieBonsPlans("loirivoire"))).toBe(true);
  });

  it("carves out the new marketing/support pages (About, Contact, Commerçants, legal) as public", () => {
    expect(isProtectedRoute(routes.main.about)).toBe(false);
    expect(isProtectedRoute(routes.main.contact)).toBe(false);
    expect(isProtectedRoute(routes.main.support)).toBe(false);
    expect(isProtectedRoute(routes.main.merchantOnboarding)).toBe(false);
    expect(isProtectedRoute(routes.main.epiceries)).toBe(false);
    expect(isProtectedRoute(routes.main.legalNotice)).toBe(false);
    expect(isProtectedRoute(routes.main.privacyPolicy)).toBe(false);
    expect(isProtectedRoute(routes.main.termsOfSale)).toBe(false);
    expect(isProtectedRoute(routes.main.cookiePolicy)).toBe(false);
  });

  it("identifies public routes", () => {
    expect(isPublicRoute(routes.auth.login)).toBe(true);
    expect(isPublicRoute(routes.home)).toBe(true);
    expect(isPublicRoute(routes.main.home)).toBe(false);
  });

  it("builds a login URL with an encoded callback", () => {
    expect(buildLoginUrl(routes.main.profile)).toBe(
      `${routes.auth.login}?callbackUrl=%2Fmain%2Fprofile`
    );
  });

  it("falls back to the bare login page without a callback", () => {
    expect(buildLoginUrl()).toBe(routes.auth.login);
  });

  it("resolves a safe, same-site callback URL", () => {
    expect(resolveCallbackUrl("/main/settings")).toBe("/main/settings");
  });

  it("rejects protocol-relative and absolute URLs to avoid open redirects", () => {
    expect(resolveCallbackUrl("//evil.example.com")).toBe(routes.main.home);
    expect(resolveCallbackUrl("https://evil.example.com")).toBe(routes.main.home);
    expect(resolveCallbackUrl(undefined)).toBe(routes.main.home);
  });
});
