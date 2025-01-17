import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import generateUniqueFlag from "@/utils/UniqueFlag";
import { useTimer } from "@/contexts/Timer";
import { Box, Button, Stack } from "@chakra-ui/react";
import axios from "axios";
import Navbar from "@/Components/Navbar";
import CustomForm from "@/Components/CustomForm";
import Footer from "@/Components/Footer";
import { Text } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const game1FlagStaticPart = process.env.NEXT_PUBLIC_STATIC_ONE;
const game3FlagStaticPart = process.env.NEXT_PUBLIC_STATIC_THREE;

const game2URL = "/Z2FtZS0z";

export default function Game1() {
  const router = useRouter();
  const { timer } = useTimer();

  const [flag, setFlag] = useState("");
  const [submission, setSubmission] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUniqueFlag = () => {
    const userId = window.localStorage.getItem("TheGameUserId");
    const newFlag = generateUniqueFlag(userId);
    setFlag(`${game1FlagStaticPart}${newFlag}}`);
  };

  const handleFlagSubmit = async (e) => {
    e.preventDefault();

    if (submission.length == 0) {
      toast.error("Please enter the flag");
      return;
    }

    setLoading(true);

    const res = await axios.post("/api/check/game-1", {
      authToken: window.localStorage.getItem("token"),
      userId: window.localStorage.getItem("TheGameUserId"),
      timeTaken: 300 - timer,
      flag: submission,
    });

    setLoading(false);

    if (res.status == 200) {
      toast.success("Correct Flag 🚩!!");
      const newFlag = generateUniqueFlag(
        window.localStorage.getItem("TheGameUserId")
      );
      const flagg = `${game3FlagStaticPart}${newFlag}}`;
      document.cookie = `flag=${flagg};path=/`;
      router.replace(game2URL);
    } else if (res.status == 204) {
      toast.error("Wrong Flag!!");
      setSubmission("");
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      router.replace("/");
    }
    fetchUniqueFlag();
  }, []);

  return (
    <Box
      backgroundColor="#c2d0dd"
      height="100vh"
      width="100vw"
      flexDirection={"column"}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Navbar />
      <Box>
        <Box>
          <Box>
            <Box>
              <Box></Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        flexDirection={"column"}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width={{ base: "95vw", sm: "400px" }}
        border="2px solid #094074"
        borderRadius={"md"}
        padding={"2rem"}
        minHeight="300px"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          flexDirection={"column"}
          mb={5}
        >
          <Box>
            <Box>
              <Box>
                <Box>
                  <Box></Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Text
            as="h4"
            sx={{
              fontSize: "1.25rem",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            To uncover the flag, in pixels you must delve. Find your way where
            tags and attributes dwell.{" "}
          </Text>
        </Box>
        <Box></Box>
        <Box>
          <Box>
            <Box>
              <Box>
                <Box>
                  <p style={{ display: "none" }}>{flag}</p>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <form onSubmit={!loading && handleFlagSubmit}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            flexDirection={"column"}
            width={"350px"}
          >
            <CustomForm
              id="submission"
              type="text"
              input={submission}
              label="Submit the flag"
              setInput={(e) => {
                setSubmission(e.target.value);
              }}
            />
            <Stack spacing={4} direction="row" align="center">
              <Button
                backgroundColor="#094074"
                sx={{
                  "&:hover": {
                    backgroundColor: "#094074",
                  },
                }}
                color="white"
                type="submit"
              >
                {loading ? (
                  <PulseLoader color={"#ffffff"} size={10} />
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                backgroundColor="#701009"
                sx={{
                  "&:hover": {
                    backgroundColor: "#701009",
                  },
                }}
                onClick={() => {
                  router.replace("/complete");
                }}
                color="white"
              >
                Finish
              </Button>
            </Stack>
          </Box>
        </form>
      </Box>
      <Footer />
    </Box>
  );
}
