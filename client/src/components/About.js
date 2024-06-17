import React, { useEffect, useState } from "react";

const About = ({ headerRef }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  window.addEventListener("resize", () => {
    setHeaderHeight(headerRef.current.offsetHeight);
  });
  useEffect(() => {
    setHeaderHeight(headerRef.current.offsetHeight);
  }, []);
  return (
    <div
      className="about-page"
      style={{
        marginTop: `${headerHeight}px`,
        height: `calc(100vh - ${headerHeight + 40}px)`,
      }}
    >
      <h1>About Me</h1>
      <p>
        My name is Uri Peer, I am a 10th grade student and I learn software
        engeneering and physics in ami asaf.{" "}
      </p>
      <p>
        I was born in gan haim and still live there to this day. I am the
        youngest brother in my family and I have 3 older siblings.{" "}
      </p>
      <p>
        I chose this project because of the struggle of being a youth guide in
        the youth movement, as one myself I experience this first hand every
        week, its realy hard to be original and think of ideas to make
        activities about, this is why I made this website.
      </p>
      <h1>About The Project</h1>
      <p>
        This project is design specificaly to help youth movement guides, as one
        myself I experience the struggle weekly. I made this project thinking
        about all the youth movement guides out there that struggle to make
        original and fun activities.
      </p>
      <p>
        {" "}
        the goal with this project is to help those guide think of fun ideas and
        making the process easier, by allowing you to make your activity here
        and look at other peoples activities, youth guides will have so much
        more fun and original ideas.
      </p>
      <h1>Youth movement activity hours</h1>
      <table class="rounded-table">
        <tr>
          <th>Day</th>
          <th>Activity Hours</th>
        </tr>
        <tr>
          <td>Sunday</td>
          <td>3pm - 12am</td>
        </tr>
        <tr>
          <td>Monday</td>
          <td>Not Active</td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td>3pm - 12am</td>
        </tr>
        <tr>
          <td>Wednesday</td>
          <td>Not Active</td>
        </tr>
        <tr>
          <td>Thursday</td>
          <td>3pm - 12am</td>
        </tr>
        <tr>
          <td>Friday</td>
          <td>Not Active</td>
        </tr>
        <tr>
          <td>Saturday</td>
          <td>Not Active</td>
        </tr>
      </table>

      <h1>Where can you find us?</h1>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d844.093818755309!2d34.918171230372145!3d32.19411713327677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d39058a90d8cb%3A0x325c230a5c5084f0!2z15TXqdeT16jXlCAyNCwg16bXldek15nXqg!5e0!3m2!1siw!2sil!4v1685988928087!5m2!1siw!2sil"
          className="map"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default About;
