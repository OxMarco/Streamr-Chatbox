import {
  useEffect,
  useState
} from "react";

function Wallet({
  address,
  provider
}) {
  const [formattedAddress, setFormattedAddress] = useState("");

  useEffect(() => {
    async function beautifyWallet() {
      if (address !== "" && address !== undefined && provider != null && typeof(provider) == "object") {
        let str = await provider.lookupAddress(address);
        if (str === null) {
          str = address.substring(0, 5).concat("...").concat(address.substring(38, 42));
        }
        setFormattedAddress(str);
      }
    }
    beautifyWallet();
  }, [address, provider]);

  return (
    formattedAddress
  );
}

export default Wallet;