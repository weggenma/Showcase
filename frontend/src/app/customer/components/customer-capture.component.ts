import {Component, Output, OnInit, EventEmitter} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CustomerService} from "../../customer/api/customer.service";
import {CustomerResource} from "../../customer/api/resources/customer.resource";
import {Router} from "@angular/router";

@Component({
    selector: "educama-shipment-capture",
    templateUrl: "./shipment-capture.component.html"
})
export class ShipmentCaptureComponent implements OnInit {

    @Output()
    public createShipmentEvent: EventEmitter<CreateShipmentEvent> = new EventEmitter<CreateShipmentEvent>();

    @Output()
    public createShipmentCancellationEvent = new EventEmitter();

    public shipmentCaptureForm: FormGroup;
    public customerSuggestions: CustomerResource[];

    public senderStreet: string;
    public senderStreetNo: string;
    public senderZipCode: string;
    public senderCity: string;

    public receiverStreet: string;
    public receiverStreetNo: string;
    public receiverZipCode: string;
    public receiverCity: string;


    constructor(private _formBuilder: FormBuilder,
                private _customerService: CustomerService,
                private _router: Router) {
    }

    public ngOnInit() {
        this.shipmentCaptureForm = this._formBuilder.group({
            sender: ["", [Validators.required]],
            receiver: ["", [Validators.required]]

        });
    }

    // ***************************************************
    // Event Handler
    // ***************************************************

    public loadUserSuggestions(event:Event){
        this._customerService.findCustomerSuggestions(event.query)
            .subscribe(customerSuggestionResource => this.customerSuggestions = customerSuggestionResource.customers);
    }

    public createNewCustomer(){
        this._router.navigate(["/customers/capture"]);
    }

    public onReceiverSelected(receiver: CustomerResource){

        this.receiverStreet = receiver.address.street;
        this.receiverStreetNo = receiver.address.streetNo;
        this.receiverZipCode = receiver.address.zipCode;
        this.receiverCity = receiver.address.city;

    }

    public onSenderSelected(sender: CustomerResource){

        this.senderStreet = sender.address.street;
        this.senderStreetNo = sender.address.streetNo;
        this.senderZipCode = sender.address.zipCode;
        this.senderCity = sender.address.city;
    }



    public cancel() {
        this.shipmentCaptureForm.reset();
        this.createShipmentCancellationEvent.emit(null);
    }

    public createShipment() {
        // TODO:
        this.createShipmentEvent.emit(
            new CreateShipmentEvent(
                this.shipmentCaptureForm.get("customer").value,null, null
            )
        )
    }
}
export class CreateShipmentEvent {
    customer: string;
    senderAddress: string;
    receiverAddress: string

    constructor(customer: string, senderAddress: string, receiverAddress: string) {
        this.customer = customer;
        this.senderAddress = senderAddress;
        this.receiverAddress = receiverAddress;
    }
}