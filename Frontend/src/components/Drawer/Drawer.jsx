import {
  Button,
  Drawer as FlowbiteDrawer,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";
import { HiEnvelope } from "react-icons/hi2";

export default function Drawer({ isOpen, onClose }) {
  return (
    <>
      <FlowbiteDrawer open={isOpen} onClose={onClose}>
        <FlowbiteDrawer.Header title="CONTACT US" titleIcon={HiEnvelope} />
        <FlowbiteDrawer.Items>
            <div className="mb-6 mt-3">
              <Label htmlFor="ifsc" className="mb-2 block">
                Your Account Number
              </Label>
              <TextInput
                id="account_no"
                name="account_no"
                placeholder="0000 0000 0000 0000"
                type="text"
                
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="ifsc" className="mb-2 block">
                IFSC code
              </Label>
              <TextInput id="ifsc" name="ifsc" placeholder="IFSC" />
            </div>
            <div className="mb-6">
              <Label htmlFor="username" className="mb-2 block">
                Account holder Name
              </Label>
              <TextInput
                id="username"
                name="username"
                placeholder="Account holder name"
              />
            </div>

            <div className="mb-6">
              <Button type="submit" className="w-full">
                Send message
              </Button>
            </div>
            
        </FlowbiteDrawer.Items>
      </FlowbiteDrawer>
    </>
  );
}
