import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useTimer } from "@/contexts/Timer";
import { Box } from "@chakra-ui/react";
import CustomForm from "@/Components/CustomForm";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import axios from "axios";
const gameAPI = "/api/Z2FtZS01/";
const gameScore = 5;
const game6URL = "/Z2FtZS02";

export default function Game5() {
  const router = useRouter();
  const { timer } = useTimer();

  const [userId, setUserId] = useState("");
  const [submission, setSubmission] = useState("");

  const handleFlagSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/check/game-5", {
      authToken: window.localStorage.getItem("token"),
      flag: submission,
      timeTaken: 600 - timer,
    });

    if (res.status == 200) {
      router.replace(game6URL);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      router.replace("/");
    }
    setUserId(window.localStorage.getItem("TheGameUserId"));
  }, []);

  useEffect(() => {
    if (timer < 1) {
      window.alert("Time's up!");
      router.replace("/complete");
    }
  }, [timer]);

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
      <Box
        flexDirection={"column"}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width={{ base: "95vw", sm: "400px" }}
        border="2px solid #094074"
        borderRadius={"md"}
        padding={"30px 0"}
        minHeight="300px"
        // sx={{
        //   '&:hover':{
        //     border: '2px solid #190482'
        //   }
        // }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          flexDirection={"column"}
          // mb={5}
        >
         <Text
            as="h4"
            sx={{
              fontSize: "1.25rem",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Head to a path you were already past, but alas this one's not quite like the last.
          </Text>
          {/* <p>Time Left: {timer}</p> */}
          <p>{`API: ${gameAPI}${btoa(userId)}`}</p>
        </Box>
        <form onSubmit={handleFlagSubmit}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            flexDirection={"column"}
            width={"350px"}
          >
            {/* <label htmlFor="submission">Flag</label>
          <input
            id="submission"
            type="text"
            value={submission}
            onChange={(e) => {
              setSubmission(e.target.value);
            }}
          /> */}
            <CustomForm
              id="submission"
              type="text"
              value={submission}
              label="Submit the flag"
              setInput={(e) => {
                setSubmission(e.target.value);
              }}
            />
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
              Submit
            </Button>
          </Box>
        </form>
      </Box>
      <Footer />
    </Box>
  );
}
