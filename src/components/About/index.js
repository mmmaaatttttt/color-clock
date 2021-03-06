import React from "react";
import { Link } from "react-router-dom";
import { DEFAULT_COLORS } from "../../data/colors";
import "./About.css";

/**
 * Component for the about page.
 * This is a basic presentational component.
 *
 * Props: none
 * State: none
 */
function About() {
  const [green, yellow, red] = DEFAULT_COLORS;
  return (
    <div className="About">
      <h2>Make time visible.</h2>
      <p>
        For folks who can't tell time or have a hard time with transitions (e.g.
        small children), color clocks use clear visuals to tell people how much
        time they have left for an activity. Time-telling skills not required.
      </p>
      <p>
        Color clocks smoothly transition between three different phases: start,
        warning and end. You control what time each phase should start and what
        each phase should look like.
      </p>
      <p>How to make a color clock:</p>
      <ol>
        <li>
          Click <Link to="/">here</Link> to fill out the color clock form.
        </li>
        <li>Select a time for the clock to start.</li>
        <li>
          Select a color for the start time (defaults to{" "}
          <span style={{ backgroundColor: green }}>green</span>).
        </li>
        <li>
          Repeat steps 2 and 3 for the warning time and the ending time (colors
          default to <span style={{ backgroundColor: yellow }}>yellow</span> and{" "}
          <span style={{ backgroundColor: red }}>red</span>, respectively).
        </li>
        <li>Click on the button to create your clock.</li>
        <li>
          (Optional.) Bookmark the clock page to revisit it any day in the
          future. The clock will remember the times and colors you selected!
        </li>
      </ol>
      <p>
        Please note that times must all be for the same calendar day. For
        example, it's not possible to make a clock that starts at 11:30 PM and
        ends at 1:00 AM the next day.
      </p>
      <p>
        <Link to="/">Go back</Link>
      </p>
    </div>
  );
}

export default React.memo(About);
