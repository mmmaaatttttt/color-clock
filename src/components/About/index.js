import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="About">
      <h2>Make time visible.</h2>
      <p>
        For folks who can't tell time and have a hard time with transitions
        (e.g. small children), color clocks give a clear visual that tells them
        how close they are to an upcoming transition. Time-telling skills not
        required.
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
          <span className="green">green</span>).
        </li>
        <li>
          Repeat steps 2 and 3 for the warning time and the ending time (colors
          default to <span className="yellow">yellow</span> and{" "}
          <span className="red">red</span>, respectively.
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

export default About;
