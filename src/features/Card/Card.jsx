import React, {useContext} from 'react';
import { Card as UICard} from 'primereact/card';
import { Button } from 'primereact/button';
import {NavLink, useParams} from "react-router-dom";

export default function Card(
    {

        id,
        name,
        price,
        children
    }
) {
  const header = (
      <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
  );

  const footer = null
  return (
      <div className="card flex justify-content-center">

          {children}

      </div>
  )
}