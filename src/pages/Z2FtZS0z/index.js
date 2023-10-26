import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import CustomForm from "@/Components/CustomForm";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import generateUniqueFlag from "@/utils/UniqueFlag";

import { useTimer } from "@/contexts/Timer";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import axios from "axios";

const game3FlagStaticPart = "flag{dfsafewcvascd";
const gameScore = 3;
const game4URL = "/Z2FtZS00";

export default function Game3() {
  const router = useRouter();
  const { timer } = useTimer();

  const [flag, setFlag] = useState("");
  const [submission, setSubmission] = useState("");

  const fetchUniqueFlag = () => {
    const userId = window.localStorage.getItem("TheGameUserId");
    const newFlag = generateUniqueFlag(userId);
    setFlag(`${game3FlagStaticPart}${newFlag}}`);
  };

  const handleFlagSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/check/game-3", {
      authToken: window.localStorage.getItem("token"),
      flag: submission,
      timeTaken: 600 - timer,
    });

    if (res.status == 200) {
      router.replace(game4URL);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      router.replace("/");
    }

    document.cookie = `flag=${flag};path=/Z2FtZS0z`;
  }, [flag]);

  useEffect(() => {
    fetchUniqueFlag();
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
          <Heading as="h2" size="xl">
            Cookie check
          </Heading>
          {/* <p>Time Left: {timer}</p> */}
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