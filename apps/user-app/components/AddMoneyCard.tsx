"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/Select";
import { useState } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { redirect } from "next/navigation";
import { CreateOnRampTransaction } from "../app/lib/actions/createOnRampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com/netbanking/",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/bank-smart/internet-banking/getting-started",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name);
  const [amount, setAmount] = useState(0);
  console.log(redirect,provider,amount)

  return (
    <Card title="Add Money">
      <div className="w-full">
        {/* Amount Input */}
        <TextInput
          label="Amount"
          placeholder="Amount"
  
          onChange={(e) => {
            setAmount(Number(e) || 0);
          }}
        />

        <div className="py-4 text-left">Bank</div>

        {/* Bank Selection */}
        <Select
          onSelect={(value) => {
            const selectedBank = SUPPORTED_BANKS.find((x) => x.name === value);
            if (selectedBank) {
              setProvider(selectedBank.name);
              setRedirectUrl(selectedBank.redirectUrl);
            }
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />

        <div className="flex justify-center pt-4">
          <Button
            onClick={async() => {
              await CreateOnRampTransaction({provider, amount}); 
              redirect(redirectUrl || ''); 
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
