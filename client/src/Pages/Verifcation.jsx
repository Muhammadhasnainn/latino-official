import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";

const Verifcation = () => {
  const [searchParams] = useSearchParams();
  const { user, userdata } = useAuthContext();
  const [plugin, setPlugin] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const FetchURL = async () => {
      const { data } = await axios.post(
        "https://neocheck.net/api/authorization/token",
        {
          username: "latinotransferPRE",
          password: "ht59TTp1",
        }
      );

      setToken(data.access_token);

      const plugin = await axios.post(
        "https://neocheck.net/api/v1/VideoIdentifications/unattended/link",
        {},
        { headers: { Authorization: `Bearer ${data.access_token}` } }
      );
      setPlugin(plugin.data);
    };
    FetchURL();
  }, []);

  var eventMethod = window.addEventListener
    ? "addEventListener"
    : "attachEvent";

  var eventer = window[eventMethod];
  var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

  eventer(messageEvent, async function (e) {
    if (e.data && e.data.code !== null && e.data.code !== undefined) {
      try {
        if (e.data.code == 0) {
          alert("Link expired! Login to your dashboard for verification.");
        } else if (e.data.code == 1) {
          let id;
          if (user) {
            id = new URL(plugin).pathname.split("/");
          } else {
            id = searchParams.get("id");
          }

          const { data } = await axios.post(
            "https://neocheck.net/api/authorization/token",
            {
              username: "latinotransferPRE",
              password: "ht59TTp1",
            }
          );

          const videoID = await axios.get(
            `https://neocheck.net/api/v1/VideoIdentifications/${
              searchParams.get("id") && searchParams.get("mail") ? id : id.pop()
            }`,
            { headers: { Authorization: `Bearer ${data.access_token}` } }
          );

          const ver_id = await axios.get(
            `https://neocheck.net/api/v1/Verifications/${videoID.data.documentVerificationId}/results?includeImages=false`,
            { headers: { Authorization: `Bearer ${data.access_token}` } }
          );

          if (user) {
            const { _id, ...others } = userdata;

            await axios.post(
              `http://localhost:8800/api/auth/mailstatus/${userdata.email}`,
              {
                msg:
                  ver_id.data.globalResultCode === 1 || ver_id.data.globalResultCode === 5
                    ? `Your identity verificaition has been successfull!`
                    : `Your document verification has been failed. Due to following reasons
              
              ${ver_id.data.globalResultDescription}`,
              }
            );

            await axios.put(
              `http://localhost:8800/api/auth/update/${userdata._id}`,
              {
                newUser: {
                  ...others,
                  neocheckId: videoID.data.id,
                  verfied:
                    ver_id.data.globalResultCode === 1 || 
                    ver_id.data.globalResultCode === 5 ? true : false,
                },
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  token: Cookies.get("token"),
                },
              }
            );
          } else {
            await axios.post(
              `http://localhost:8800/api/auth/mailstatus/${searchParams.get(
                "mail"
              )}`,
              {
                msg:
                  ver_id.data.globalResultCode === 1 || ver_id.data.globalResultCode === 5
                    ? `Your identity verification has been successfull!`
                    : `Your document verification has been failed. Due to following reasons
              
 ${ver_id.data.globalResultDescription}`,
              }
            );

            await axios.put(
              `http://localhost:8800/api/auth/updatestatus/${searchParams.get(
                "mail"
              )}`,
              { verified: ver_id.data.globalResultCode === 1 
                || ver_id.data.globalResultCode === 5 ? true : false }
            );
          }

          alert("Check your mail for report");
        } else {
          alert(e.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  });

  return (
    <div className="mt-5 verify">
      <div className="canvas">
        <iframe
          style={{ width: "100%", height: "100vh" }}
          allow="microphone, camera"
          scrolling="no"
          src={
            searchParams.get("id") && searchParams.get("mail")
              ? `https://safeonboarding.net/VideoIdentification/Index/${searchParams.get(
                  "id"
                )}?language=es`
              : plugin
          }
        />
      </div>
    </div>
  );
};

export default Verifcation;
