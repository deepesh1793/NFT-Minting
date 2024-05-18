import { Fragment } from "react";
import { GeneralHook } from "../hooks/generalHook";
import { encodeIcrcAccount } from "@dfinity/ledger";
import { Principal } from "@dfinity/principal";
import { hexToUint8Array } from "@/utils";
import QRCode from "react-qr-code";
import { CustomCopy } from "@components/CopyTooltip";
import { AccountHook } from "@pages/hooks/accountHook";

const DrawerReceive = () => {
  const { selectedAccount } = GeneralHook();
  const { authClient } = AccountHook();

  return (
    <Fragment>
      <div className="flex flex-col justify-start items-center w-full h-full gap-4 pt-[30%]">
        <div className="flex justify-center items-center w-[60%] border-4 border-SelectRowColor bg-white rounded-lg p-3">
          <QRCode
            style={{ height: "auto", maxWidth: "100%", width: "100%", borderRadius: "0.5rem" }}
            value={copyValue()}
          />
        </div>
        <div className="flex flex-row justify-center items-center p-2 border border-BorderColorLight dark:border-BorderColor bg-SecondaryColorLight dark:bg-SecondaryColor rounded">
          <p className="text-PrimaryTextColorLight dark:text-PrimaryTextColor mr-2 break-all">{copyValue()}</p>
          <CustomCopy
            background="default"
            copyStroke="fill-PrimaryTextColor"
            size={"small"}
            boxSize={"small"}
            copyText={copyValue()}
          />
        </div>
      </div>
    </Fragment>
  );

  function copyValue() {
    return encodeIcrcAccount({
      owner: Principal.fromText(authClient),
      subaccount: hexToUint8Array(selectedAccount?.sub_account_id || "0x0"),
    });
  }
};

export default DrawerReceive;
