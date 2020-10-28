import React from "react";
import ReactDOM from "react-dom";

import WaykeEcom from "@wayke-se/ecom-react";
import { config } from "@wayke-se/ecom";

import "@wayke-se/ecom-react/assets/styles/default.css";

const w = (window as any) || {};
const WAYKE_API_ADDRESS = w.WAYKE_API_ADDRESS || "https://ecom.wayke.se";
const WAYKE_ECOM_ID = w.WAYKE_ECOM_ID || "__wayke__ecom__";

export interface IEcomVehicle {
    id: string;
    title?: string;
    description?: string;
    price: number;
    image: string;
    modelYear: number;
    mileage?: string;
    gearbox?: string;
    fuel?: string;
}

export interface IEcomOrigin {
    channel: string;
    topic: string;
}

export interface IEcomProperties {
    vehicle: IEcomVehicle;
    logotype: string;
    onExit?: () => void;
    onEvent?: (eventType: string, currentStep: string) => void;
    useBankId?: boolean;
    useBankIdThumbprint?: string;
    displayBankIdAlert?: boolean;
    useOrigin?: IEcomOrigin;
}

const destroy = () => {
    const el = document.getElementById(WAYKE_ECOM_ID);
    if (!el) return;

    ReactDOM.unmountComponentAtNode(el);
    document.body.removeChild(el);
};

const display = (props: IEcomProperties) => {
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
