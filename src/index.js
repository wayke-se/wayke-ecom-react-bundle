import React from "react";
import ReactDOM from "react-dom";

import WaykeEcom from "@wayke-se/ecom-react";
import { config } from "@wayke-se/ecom";

import "@wayke-se/ecom-react/assets/styles/default.css";

const WAYKE_API_ADDRESS = window.WAYKE_API_ADDRESS || "https://ecom.wayke.se";
const WAYKE_ECOM_ID = window.WAYKE_ECOM_ID || "__wayke__ecom__";

const destroy = () => {
    const el = document.getElementById(WAYKE_ECOM_ID);
    if (!el) return;

    ReactDOM.unmountComponentAtNode(el);
    document.body.removeChild(el);
};

const display = (props) => {
    destroy();

    config.bind({
        api: {
            address: WAYKE_API_ADDRESS,
        },
        bankIdThumbprint: props.useBankIdThumbprint,
        origin: props.useOrigin,
    });

    const passthrough = {
        vehicle: {
            id: props.vehicle.id,
            title: props.vehicle.title || "",
            shortDescription: props.vehicle.description || "",
            price: props.vehicle.price,
            imageUrl: props.vehicle.image,
            modelYear: props.vehicle.modelYear,
            milage: props.vehicle.mileage || "",
            gearBox: props.vehicle.gearbox || "",
            fuelType: props.vehicle.fuel || "",
        },
        serviceLogotypeUrl: props.logotype,
        onExit: props.onExit || destroy,
        onUserEvent: props.onEvent,
        useBankId: props.useBankId,
        bankIdThumbprint: props.useBankIdThumbprint,
        displayBankIdAlert: props.displayBankIdAlert,
    };

    const el = document.createElement("div");
    el.setAttribute("id", WAYKE_ECOM_ID);
    document.body.appendChild(el);

    ReactDOM.render(
        <WaykeEcom {...passthrough} />,
        document.getElementById(WAYKE_ECOM_ID)
    );
};

export const Ecom = { display, destroy };
