const generateEmailTemplate = ({ imageUrl, eventName, location, quantity, date, time, ticketPrice, ticketId, amount, QRCode }: { imageUrl: string, eventName: string, location: string, quantity: number, date: string, time: string, ticketPrice: number, ticketId: string, amount: number, QRCode: string }) => `
    <div style="display: flex; flex-direction: column; color:white; align-items: center; justify-content: center;">
        <div style="background-color: #2A2D34; padding: 15px;">
            <div style=" border-radius: 8px; margin: 5px;">
                <img src="${imageUrl}" width="0" height="0" style="width: 100%;  height: 250px;" alt="" unoptimized>
            </div>
            <div style="margin-top: 10px; padding: 16px;">
                <div style="display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 1rem; font-weight: bold;">
                        ${eventName}
                    </span>
                </div>
            </div>
            <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 3px;">
                <div>
                    <span style="color: #90A0B7;">
                        ${location}
                    </span>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <span style="font-size: 1rem; font-weight: bold; padding-left: 10px">
                        &nbsp;&nbsp;&nbsp;&nbsp;${quantity}&nbsp;
                    </span>
                    <span style="color: #90A0B7;">Ticket(s)</span>
                </div>
            </div>
            <div style="display: flex; flex-direction: column; padding-top: 10px;">
                <span style="color: #90A0B7; padding-left: 5px">Date & time</span>
                <span>
                    &nbsp;&nbsp;&nbsp;${date} at ${time}
                </span>
            </div>
            <div style="display: flex; flex-direction: column; padding-top: 10px;">
                <span style="color: #90A0B7; padding-left: 5px">Ticket Price</span>
                <span>  &nbsp;&nbsp;&nbsp;LKR ${ticketPrice}.00/=</span>
            </div>
            <div style="display: flex; flex-direction: column; padding-top: 10px;">
                <span style="color: #90A0B7; padding-left: 5px">QR Code</span>
                <span>  &nbsp;&nbsp;&nbsp;${QRCode}</span>
            </div>
            <div style="border-bottom: dashed 1px #90A0B7; padding-top: 20px;"></div>
            <div style="display: flex; flex-direction: column; padding-top: 10px;">
                <span style="color: #90A0B7; padding-left: 5px">Ticket No.</span>
                <span>&nbsp;${ticketId}</span>
            </div>
            <div style="display: flex; flex-direction: column; padding-top: 10px;">
                <span style="color: #90A0B7; padding-left: 5px">Paid</span>
                <span style="color: #E50914; font-weight: bold;">&nbsp;LKR ${amount}.00/=</span>
            </div>
        </div>
    </div>
`;

export default generateEmailTemplate;