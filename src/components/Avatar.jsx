import { supabase, useConfiguratorStore } from "@/store";
import { useGLTF } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import Asset from "./Asset";

const Avatar = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/models/Armature.glb");
  const customization = useConfiguratorStore((state) => state.customization);
  const [url, setUrls] = useState({});


  useEffect(() => {
    const fetchUrls = async () => {
      const fetchedUrls = await Promise.all(
        Object.keys(customization).map(async (key) => {
          if (customization[key]?.asset?.id) {
            const { data, error } = supabase.storage.from("gltf_model").getPublicUrl(customization[key].asset.glb);
            if (data) {
              return { key, url: data.publicUrl }; // keyとURLを返す
            } else if (error) {
              console.error(error.message);
            }
          }
          return null; // assetがない場合はnullを返す
        })
      );

      // 有効なURLをオブジェクトに格納
      const validUrls = fetchedUrls.filter(urlObj => urlObj).reduce((acc, { key, url }) => {
        acc[key] = url;
        return acc;
      }, {});

      setUrls(validUrls); // URLを設定
    };

    fetchUrls();
  }, [customization]);
  return (
    // dispose=リソース開放の指定
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {Object.keys(customization).map(
            (key) =>
              customization[key]?.asset?.id && (
                <Suspense key={customization[key].asset.id}>
                  <Asset
                    url={urls[key]}
                    skeleton={nodes.Plane?.skeleton || null}
                  />
                </Suspense>
              )
          )}
        </group>
      </group>
    </group>
  );
};

export default Avatar;