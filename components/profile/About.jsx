import React from 'react';
import useAuthUser from '../../pages/api/UseAuthUser';
import { Client } from "@hiveio/dhive";

const About = () => {
  return (
    <div>
      <h1>Hello, World!</h1>
      <iframe src="https://discord.com/widget?id=631777256234156033&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
    </div>
  );
};

export default About;
