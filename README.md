# Pre-bundled Wayke Ecom component

This project creates a stand alone javascript bundle with the Wayke Ecom component which can be directly referenced from HTML - without manually building the component from source.

## Sources

- https://github.com/wayke-se/wayke-ecom-js
- https://github.com/wayke-se/wayke-ecom-react

## Usage

```html
<!doctype html>
<head>
    <meta charset="utf-8" />
</head>
<html>
    <body>
        <script src="https://cdn.wayke.se/public-assets/wayke.ecom.v3.2.1.js"></script>
        <!--
            A development version is available here:
            <script src="https://test-cdn.wayketech.se/public-assets/wayke.ecom.v3.1.0.js"></script>
        //-->
        <script>
            function openWaykeEcom() {
                Wayke.Ecom.display({
                    vehicle: {
                        id: "ec8430fe-b470-4f6d-b7ae-ea407a780d3d",
                        title: "Volvo XC60 D4 Classic Momentum",
                        description: "Vehicle Description",
                        price: 238500,
                        image: "https://cdn.wayke.se/media/5e6488a7-cac4-4cd1-8163-5cd4b49feb45/a3489ff8-8699-4da6-a812-91799f1534f8/380x253",
                        modelYear: 2017,
                        mileage: "7967",
                        gearbox: "Manuell",
                        fuel: "Diesel",
                    },
                    logotype: "https://my-domain.com/my-logotype.png",
                    useBankId: true,
                    useBankIdThumbprint: "MY-BANKID-CERTIFICATE-THUMBPRINT",
                    displayBankIdAlert: true,
                    onExit: function() {
                        Wayke.Ecom.destroy();
                    },
                    onEvent: function(eventType, currentStep) {
                        console.log('type:', eventType, 'step:', currentStep);
                    },
                    useOrigin: {
                        topic: "web",
                        channel: "my-domain.com"
                    }
                });
            }
        </script>

        <input type="button" value="click me" onClick="javascript: openWaykeEcom();" />
    </body>
</html>
```
