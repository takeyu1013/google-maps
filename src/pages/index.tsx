import { AppShell, Center, NumberInput, Stack, Text } from "@mantine/core";
import { useInputState, useViewportSize } from "@mantine/hooks";
import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useLoadScript,
} from "@react-google-maps/api";

export const Home = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
    libraries: ["geometry", "places"],
  });
  const { height, width } = useViewportSize();
  const [sampleLat, setSampleLat] = useInputState(35.6817647);
  const [sampleLng, setSampleLng] = useInputState(139.766148);
  const [targetLat, setTargetLat] = useInputState(35.681);
  const [targetLng, setTargetLng] = useInputState(139.766);

  return (
    <AppShell>
      <Stack>
        <NumberInput
          label="target lat"
          hideControls
          value={targetLat}
          onChange={setTargetLat}
          precision={6}
        />
        <NumberInput
          label="target lng"
          hideControls
          value={targetLng}
          onChange={setTargetLng}
          precision={6}
        />
        <NumberInput
          label="lat"
          hideControls
          value={sampleLat}
          onChange={setSampleLat}
          precision={6}
        />
        <NumberInput
          label="lng"
          hideControls
          value={sampleLng}
          onChange={setSampleLng}
          precision={6}
        />
        <Text>
          distance:{" "}
          {isLoaded &&
            window.google.maps.geometry.spherical.computeDistanceBetween(
              { lat: sampleLat, lng: sampleLng },
              { lat: targetLat, lng: targetLng }
            )}{" "}
          m
        </Text>
        <Center>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: width / 2, height: height / 2 }}
              center={{ lat: 35.6817647, lng: 139.766148 }}
              zoom={17}
            >
              <MarkerF
                position={{ lat: sampleLat, lng: sampleLng }}
                label={{ text: "S" }}
              />
              <MarkerF
                position={{ lat: targetLat, lng: targetLng }}
                label={{ text: "T" }}
              />
              <PolylineF
                path={[
                  { lat: sampleLat, lng: sampleLng },
                  { lat: targetLat, lng: targetLng },
                ]}
              />
            </GoogleMap>
          )}
        </Center>
      </Stack>
    </AppShell>
  );
};

export default Home;
