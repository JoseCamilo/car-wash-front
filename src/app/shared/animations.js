import {
  trigger,
  transition,
  animate,
  style,
  keyframes,
  state,
  query,
  stagger,
} from "@angular/animations";

export const listEnterSmoothAnimation = trigger("listEnterSmoothAnimation", [
  transition("* => *", [
    query(
      ":enter",
      [
        style({
          opacity: 0,
        }),
        stagger(
          "300ms",
          animate(
            "1000ms ease-out",

            style({
              opacity: 1,
            })
          )
        ),
      ],
      { optional: true }
    ),
  ]),
]);

export const enterSmoothTrigger = trigger("enterSmoothTrigger", [
  transition(":enter", [
    style({ opacity: 0 }),
    animate("500ms", style({ opacity: 1 })),
  ]),
]);
