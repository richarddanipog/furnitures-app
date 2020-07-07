import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="mt-5">
      <div className="row">
        <div className=" shipping-policy col-md-6 col-sm-12">
          <div className="shipping-policy__left">
            <h5>Shipping Policy</h5>
            <div>
              <h6>Contact Information</h6>
              <h6>Shipping:</h6>
              <p>Usually leaves our warehouse in 1-2 business days. *</p>
              <h6>Standard Return Policy:</h6>
              <p>
                Items must be returned in new or unused condition and contain
                all original materials included with the shipment.
              </p>
              <h6>International Shipping:</h6>
              <p>
                We proudly offer international shipping to over 180 countries
                and several US Territories. Click here to see a list of
                supported countries by region. Please note, the estimated
                delivery timeframe displayed at checkout combines the time to
                process your order, transit time to our International export
                facility plus the processing time to ship it outside of the
                United States.Additional fees may be required by the carrier for
                deliveries to remote shipping locations.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <h5>IMAGE</h5>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
