# TOP-calculator
This is the final project developed to comply for The Odin Project's foundations course. Just like any web developer and learner that made a project like this, my on-screen calculator serves as the culmination of all the things I learned so far from TOP. The design is inspired by Casio's scientific calculator, which is something I have used all throughout my studying career. 

Back to this project, the following are the skills I put into practice during its development:

* Use event handling and its attributes to reduce event listener attachment redundancy.
* Establish objects to map element IDs to their corresponding values.
* Utilize DOM manipulation techniques to display correct values on the calculator screen.
* Apply single responsibility principle to distribute respective function per button effect.
* Practice using box-shadow, active and focus attributes for highlighting, and linear-gradient to manifest a 3D appearance of the calculator.

---

### Features

The calculator has 2 main section:

1. **Display Screen:** The input values and output results appear here. It has a *10* character limit (excluding negative sign).

2. **Keypad:** It has 8 button type.
    * *Number Keys* - The buttons that inputs number values for the calculator to display and read.
    * *Operator Keys* - Clicking one of these dictates what operation the calculator will operate on the clicked number keys.
    * *Clear Button (AC)* - Replaces display screen content with '0' and resets all prior values. Corresponding keyboard key is '**esc**';
    * *Sign Change Button (+/-)* - Switches the values to negative or back to positive. Corresponding keyboard key is **arrow up**;
    * *Percentage Button (%)* - Converts display value to percentage. Corresponding keyboard key is '**%**'.
    * *Backspace Button (DEL)* - Removes the right most character in the display screen each click. Corresponding keyboard key is '**backspace**' or '**←**'.
    * *Decimal Point Button ( . )* - Appends a decimal point in the display screen. Will not work if the currently displayed value already has it. Corresponding keyboard key is "**.**" .
    * *Equal Sign Button (=)* - Triggers the computation of the result and its display on the screen. Corresponding keyboard key is '**=**' or '**Enter**';

---

### Acknowledgement

I would like to personally express my gratitude for The Odin Project community and their contributors for making self-paced learning manageable and informative.

