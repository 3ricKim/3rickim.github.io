// The complete illustration is visible without JavaScript. Animation is optional.
const route = document.querySelector(".field-route");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let routeAnimation;

function drawRoute() {
  if (!route || motionPreference.matches || !route.animate) return;
  routeAnimation = route.animate(
    [{ strokeDashoffset: "1" }, { strokeDashoffset: "0" }],
    { duration: 4000, easing: "cubic-bezier(.25, .1, .25, 1)" },
  );
}

if (route && !motionPreference.matches) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        drawRoute();
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(route.closest("svg"));
  } else {
    drawRoute();
  }
}

motionPreference.addEventListener("change", (event) => {
  if (event.matches) routeAnimation?.cancel();
});
