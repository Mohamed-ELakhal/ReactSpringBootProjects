import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useCheckout from "../../Hooks/Checkout-Use";
import "./Checkout-Form.css";
import { getAllCOUNTRIES,getstateByCountryId,postOrder } from "../../util/http";
import { useQuery ,useMutation} from '@tanstack/react-query';

const CheckoutForm = () => {

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postOrder,
  });

  let formIsValid = false;

  const [sameAsShipping, setSameAsShipping] = useState(false);
  
  const cartItems = useSelector((state) => state.cart.items);
    let subTotal=cartItems.reduce((prevTotalAmount, item) => {
        return prevTotalAmount + item.totalPrice;
      }, 0);

  
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        valueChangeHandler: firstNameChangedHandler,
        inputBlurHandler:firstNameBlurHandler,
        reset: resetFirstNameInput,
      } = useCheckout((value) => value.trim() !== "");

      const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        valueChangeHandler: lastNameChangedHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastNameInput,
      } = useCheckout((value) => value.trim() !== "");

      const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetemailInput,
      } = useCheckout((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) );

      const {
        value: enteredCardNumber,
        isValid: enteredCardNumberIsValid,
        hasError: cardNumberinputHasError,
        valueChangeHandler: cardNumberChangedHandler,
        inputBlurHandler: cardNumberBlurHandler,
        reset: resetcardNumberInput,
      } = useCheckout((value) => /^[0-9]+$/.test(value) && value.length === 16 );

      const {
        value: enteredCardExpiry,
        isValid: enteredCardExpiryIsValid,
        hasError: cardExpiryinputHasError,
        valueChangeHandler: cardExpiryChangedHandler,
        inputBlurHandler: cardExpiryBlurHandler,
        reset: resetcardExpiryInput,
      } = useCheckout((value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) );


      const {
        value: enteredCVC,
        isValid: enteredCVCIsValid,
        hasError: cvcinputHasError,
        valueChangeHandler: cvcChangedHandler,
        inputBlurHandler: cvcBlurHandler,
        reset: resetcvcInput,
      } = useCheckout((value) => /^[0-3]+$/.test(value) && value.length === 3 );

      const {
        value: enteredCountry,
        isValid: enteredCountryIsValid,
        hasError: countryinputHasError,
        valueChangeHandler: countryChangedHandler,
        inputBlurHandler: countryBlurHandler,
        reset: resetCountryInput,
      } = useCheckout((value) =>  value.trim() !== "");

      const { data:countries, isLoading:countriesIsLoading, isError:countriesIsError, error:countriesError } = useQuery({
        queryKey: ['/checkout'],
        queryFn:getAllCOUNTRIES,
      });
    
      
      let contentCountries ;
      if(countries){
        
        contentCountries=
         countries.map((country) => (
          <option  key={country.id} value={country.name}>
            {country.name}
          </option>));
      }

      

      let filteredCountries;
      if(enteredCountry.trim()!=="")
        filteredCountries=countries.filter((country) =>
        country.name.toLowerCase().includes(enteredCountry.toLowerCase())
      );
      

      const { data: states, isLoading: statesIsLoading, isError: statesIsError, error: statesError } = useQuery({
        queryKey: filteredCountries ? [filteredCountries] : null,
        queryFn: () => getstateByCountryId(filteredCountries),
        enabled: !!filteredCountries, // Enable the query only when filteredCountries is truthy
      });
      

      const {
        value: enteredState,
        isValid:enteredStateIsValid,
        hasError: stateinputHasError,
        valueChangeHandler: stateChangedHandler,
        inputBlurHandler: stateBlurHandler,
        reset: resetStateInput,
      } = useCheckout((value) =>  value.trim() !== "");

      let contentStates ;
      if(states){
        contentStates=
         states.map((state) => (
          <option  key={state.id} value={state.name}>
            {state.name}
          </option>));
      }

      const {
        value: enteredCity,
        isValid:enteredCityIsValid,
        hasError: ctyinputHasError,
        valueChangeHandler: cityChangedHandler,
        inputBlurHandler: cityBlurHandler,
        reset: resetCityInput,
      } = useCheckout((value) =>  value.trim() !== "");


      const {
        value: enteredZipcode,
        isValid:enteredZipcodeIsValid,
        hasError: zipcodeinputHasError,
        valueChangeHandler: zipcodeChangedHandler,
        inputBlurHandler: zipcodeBlurHandler,
        reset: resetzipcodeInput,
      } = useCheckout((value) => /^[0-9]+$/.test(value) && value.length === 5);

      const {
        value: enteredStreet,
        isValid:enteredStreetIsValid,
        hasError: streetinputHasError,
        valueChangeHandler: streetChangedHandler,
        inputBlurHandler: streetBlurHandler,
        reset: resetstreetInput,
      } = useCheckout((value) =>  value.trim() !== "");


      //Billing Address
      const {
        value: enteredCountryBilling,
        isValid: enteredCountryBillingIsValid,
        hasError: countryBillinginputHasError,
        valueChangeHandler: countryBillingChangedHandler,
        inputBlurHandler: countryBillingBlurHandler,
        reset: resetCountryBillingInput,
        setEnteredValue:setCountryBilling,
      } = useCheckout((value) =>  value.trim() !== "");
    

  
      let filteredCountriesBilling;
      if(enteredCountryBilling.trim()!=="")
      filteredCountriesBilling=countries.filter((country) =>
        country.name.toLowerCase().includes(enteredCountryBilling.toLowerCase())
      );
      

      const { data: statesBilling, isLoading: statesBillingIsLoading, isError: statesBillingIsError, error: statesBillingError } = useQuery({
        queryKey: filteredCountriesBilling ? [filteredCountriesBilling] : null,
        queryFn: () => getstateByCountryId(filteredCountriesBilling),
        enabled: !!filteredCountriesBilling, // Enable the query only when filteredCountries is truthy
      });
      

      const {
        value: enteredStateBilling,
        isValid:enteredStateBillingIsValid,
        hasError: stateBillinginputHasError,
        valueChangeHandler: stateBillingChangedHandler,
        inputBlurHandler: stateBillingBlurHandler,
        reset: resetStateBillingInput,
        setEnteredValue:setStateBilling,
      } = useCheckout((value) =>  value.trim() !== "");

      let contentStatesBilling ;
      if(statesBilling){
        contentStatesBilling=
         statesBilling.map((state) => (
          <option  key={state.id} value={state.name}>
            {state.name}
          </option>));
      }

      const {
        value: enteredCityBilling,
        isValid:enteredCityBillingIsValid,
        hasError: cityBillinginputHasError,
        valueChangeHandler: cityBillingChangedHandler,
        inputBlurHandler: cityBillingBlurHandler,
        reset: resetCityBillingInput,
        setEnteredValue:setCityBilling,
      } = useCheckout((value) =>  value.trim() !== "");


      const {
        value: enteredZipcodeBilling,
        isValid:enteredZipcodeBillingIsValid,
        hasError: zipcodeBillinginputHasError,
        valueChangeHandler: zipcodeBillingChangedHandler,
        inputBlurHandler: zipcodeBillingBlurHandler,
        reset: resetzipcodeBillingInput,
        setEnteredValue:setZipcodeBilling,
      } = useCheckout((value) => /^[0-9]+$/.test(value) && value.length === 5);

      const {
        value: enteredStreetBilling,
        isValid:enteredStreetBillingIsValid,
        hasError: streetBillinginputHasError,
        valueChangeHandler: streetBillingChangedHandler,
        inputBlurHandler: streetBillingBlurHandler,
        reset: resetstreetBillingInput,
        setEnteredValue:setStreetBilling,
      } = useCheckout((value) =>  value.trim() !== "");


      const handleSameAsShippingChange = () => {
        setSameAsShipping((prev) => !prev);
    
        // If checked, copy values from shipping to billing
        if (!sameAsShipping) {
          setCountryBilling(enteredCountry);
          setStateBilling(enteredState);
          setCityBilling(enteredCity);
          setZipcodeBilling(enteredZipcode);
          setStreetBilling(enteredStreet);
        } else {
          // If unchecked, reset billing fields
          setCountryBilling('');
          setStateBilling('');
          setCityBilling('');
          setZipcodeBilling('');
          setStreetBilling('');
        }
      };

      if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid &&
        enteredCVCIsValid && enteredCardExpiryIsValid && enteredCardNumberIsValid &&
        enteredCityIsValid &&enteredCountryIsValid && enteredStreetIsValid &&
        enteredStateIsValid &&enteredZipcodeIsValid && enteredCountryBillingIsValid &&
        enteredStateBillingIsValid &&enteredStreetBillingIsValid &&enteredZipcodeBillingIsValid &&
        enteredCityBillingIsValid) {
        formIsValid = true;
        }
        

      

    const formHandler=(event )=>{
      event.preventDefault();
      const stateShippingobject=states.filter((state)=>
        state.name.toLowerCase().includes(enteredState.toLowerCase())
        )

        const stateBillingobject=states.filter((state)=>
        state.name.toLowerCase().includes(enteredStateBilling.toLowerCase())
        )

        const orderLines = cartItems.map((item) => ({
          productId: item.id,
          unitPrice:item.unitPrice,
          quantity: item.quantity,
          
          // You can add other properties like name, description, imageUrl, etc. if needed
        }));
      if (!formIsValid)
        return;
        const orderData = {
          firstName: enteredFirstName,
          lastName: enteredLastName,
          email: enteredEmail,
          cardNumber: enteredCardNumber,
          cardExpiry: enteredCardExpiry,
          cvc: enteredCVC,
          shippingAddress: {
            country: {
              id: filteredCountries[0].id,
              code: filteredCountries[0].code,
              name: filteredCountries[0].name,
            },
            state: {
              id: stateShippingobject[0].id,
              name: stateShippingobject[0].name,
              country: {
                id: filteredCountries[0].id,
                code: filteredCountries[0].code,
                name: filteredCountries[0].name,
              },
            },
            street: enteredStreet,
            city: enteredCity,
            zipcode: enteredZipcode,
          },
          billingAddress: {
            country: {
              id: filteredCountriesBilling[0].id,
              code: filteredCountriesBilling[0].code,
              name: filteredCountriesBilling[0].name,
            },
            state: {
              id: stateBillingobject[0].id,
              name: stateBillingobject[0].name,
              country: {
                id: filteredCountriesBilling[0].id,
                code: filteredCountriesBilling[0].code,
                name: filteredCountriesBilling[0].name,
              },
            },
            street: enteredStreetBilling,
            city: enteredCityBilling,
            zipcode: enteredZipcodeBilling,
          },
          orderLines:orderLines ,
        };

        mutate(orderData);
        resetFirstNameInput();
        resetLastNameInput();
        resetemailInput();
        resetcardExpiryInput();
        resetcardNumberInput();
        resetcvcInput();
        resetCountryInput();
        resetStateInput();
        resetCityInput();
        resetstreetInput();
        resetzipcodeInput();
        resetCountryBillingInput();
        resetStateBillingInput();
        resetCityBillingInput();
        resetstreetBillingInput();
        resetzipcodeBillingInput();
        setSameAsShipping(false);
    }
  return (
    <div className="container">
        <h1 className="text-center my-5">Checkout Form</h1>
        <form onSubmit={formHandler}>
        <div className="row" style={{ marginBottom: '100px' }}>
        <div className="col-md-6" >
        <h4>Customer Info</h4>
        <div className="form-group">
        <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" id="firstName"
             value={enteredFirstName}
            onChange={firstNameChangedHandler}
            onBlur={firstNameBlurHandler} />
              {firstNameInputHasError &&<div className="invalid-feedback" >
              <div>First name is required.</div>
            </div>}
        </div>

        <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
            <input type="text" className="form-control" id="lastName"
             value={enteredLastName}
            onChange={lastNameChangedHandler}
            onBlur={lastNameBlurHandler} />
              {lastNameInputHasError &&<div className="invalid-feedback" >
              <div>Last name is required</div>
            </div>}
        </div>

        <div className="form-group">
        <label htmlFor="Email">Email</label>
            <input type="text" className="form-control" id="Email"
             value={enteredEmail}
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler} />
              {emailInputHasError &&<div className="invalid-feedback" >
              <div>Invalid email format.</div>
            </div>}
        </div>


        </div>

        <>
        <div className="col-md-6" >
          <h4>Payment Info</h4>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input type="text" className="form-control" id="cardNumber" 
            value={enteredCardNumber}
            onChange={cardNumberChangedHandler}
            onBlur={cardNumberBlurHandler} />
            {cardNumberinputHasError &&<div className="invalid-feedback" >
              <div >Card number must be a 16-digit number.</div>
            </div>}
          </div>
          <div className="form-group">
            <label htmlFor="cardExpiry">Card Expiry</label>
            <input type="text" placeholder="MM/YY" className="form-control" id="cardExpiry" 
            value={enteredCardExpiry}
            onChange={cardExpiryChangedHandler}
            onBlur={cardExpiryBlurHandler}/>
            {cardExpiryinputHasError &&<div className="invalid-feedback" >
              <div >Card expiry must be in the format MM/YY.</div>
            </div>}
          </div>
          <div className="form-group">
            <label htmlFor="cardCVC">CVC</label>
            <input type="text" className="form-control" id="cardCVC"
             value={enteredCVC}
             onChange={cvcChangedHandler}
             onBlur={cvcBlurHandler}/>
           {cvcinputHasError &&<div className="invalid-feedback" >
              <div >CVC must be a 3-digit number.</div>
            </div>}
          </div>
        </div>
        </>
        </div>
        <div className="row">
        <div className="col-md-6" >
          <h4>Shipping Address</h4>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
            value={enteredCountry}
            onChange={countryChangedHandler}
            onBlur={countryBlurHandler}
              className="form-control" id="country" >
                <option value="" disabled></option>
              {contentCountries}
            </select>
            {countryinputHasError &&<div className="invalid-feedback" >
              <div>Country is required.</div>
            </div>}
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <select className="form-control" id="state"
            value={enteredState}
            onChange={stateChangedHandler}
            onBlur={stateBlurHandler}  >
            <option value="" disabled></option>
            {contentStates}
            </select>
            {stateinputHasError &&<div className="invalid-feedback" >
              <div >State is required.</div>
            </div>}
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" className="form-control" id="city"
            value={enteredCity}
            onChange={cityChangedHandler}
            onBlur={cityBlurHandler} />
            {ctyinputHasError &&<div className="invalid-feedback" >
              <div >City is required.</div>
            </div>}
          </div>

          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input type="text" className="form-control" id="street"
            value={enteredStreet}
            onChange={streetChangedHandler}
            onBlur={streetBlurHandler} />
            {streetinputHasError &&<div className="invalid-feedback" >
              <div >Street is required.</div>
            </div>}
          </div>
          
          
          <div className="form-group">
            <label htmlFor="zipcode">Zipcode</label>
            <input type="text" className="form-control" id="zipcode"
            value={enteredZipcode}
            onChange={zipcodeChangedHandler}
            onBlur={zipcodeBlurHandler}  />
            {zipcodeinputHasError &&<div className="invalid-feedback" >
              <div >Zipcode must be a 5-digit number.</div>
            </div>}
          </div>
        </div>

        <div className="col-md-6" >
          <h4>Billing Address</h4>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              className="form-control" id="country"
              value={enteredCountryBilling}
              onChange={countryBillingChangedHandler}
              onBlur={countryBillingBlurHandler} >
              <option value="" disabled></option>
              {contentCountries}
            </select>
            {countryBillinginputHasError &&<div className="invalid-feedback" >
              <div >Country is required.</div>
            </div>}
          </div>

          <div class="form-group">
            <label htmlFor="state">State</label>
            <select className="form-control" id="state"
            value={enteredStateBilling}
            onChange={stateBillingChangedHandler}
            onBlur={stateBillingBlurHandler}  >
              <option value="">-- Select a state --</option>
              {contentStatesBilling}
            </select>
            {stateBillinginputHasError &&<div className="invalid-feedback" >
              <div >State is required.</div>
            </div>}
          </div>


          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" className="form-control" id="city"
            value={enteredCityBilling}
            onChange={cityBillingChangedHandler}
            onBlur={cityBillingBlurHandler} />
            {cityBillinginputHasError &&<div className="invalid-feedback" >
              <div>City is required.</div>
            </div>}
          </div>


          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input type="text" className="form-control" id="street"
            value={enteredStreetBilling}
            onChange={streetBillingChangedHandler}
            onBlur={streetBillingBlurHandler}
            />
            {streetBillinginputHasError &&<div className="invalid-feedback" >
              <div >Street is required.</div>
            </div>}
          </div>
          
          
          <div className="form-group">
            <label htmlFor="zipcode">Zipcode</label>
            <input type="text" className="form-control" id="zipcode"
            value={enteredZipcodeBilling}
            onChange={zipcodeBillingChangedHandler}
            onBlur={zipcodeBillingBlurHandler} />
            {zipcodeBillinginputHasError &&<div className="invalid-feedback" >
              <div >Zipcode must be a 5-digit number.</div>
            </div>}
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="sameAsShipping" checked={sameAsShipping}
              onChange={handleSameAsShippingChange}  />
            <label className="form-check-label" htmlFor="sameAsShipping">Same as Shipping Address</label>
          </div>
        </div>
        </div>

        <div className="card">
        <div className="card-header">Review Order <hr/></div>
        <div className="card-body">
        <p className="card-text" style={{ fontWeight: 'bold' }}>
      Subtotal: {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(subTotal)}
    </p>
    <p className="card-text" style={{ fontWeight: 'bold' }}>
    Shipping: {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(0)}
    </p>
    <p className="card-text price" style={{ fontWeight: 'bold' }}>
    Total: {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(subTotal)}
    </p>
        </div>
        <div className="card-footer">
      <button disabled={!formIsValid} type="submit" className="btn btn-primary">Submit</button>
      </div>
      </div>
        
        </form>
    </div>
  );
};

export default CheckoutForm;
