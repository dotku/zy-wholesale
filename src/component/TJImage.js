import { useEffect, useState } from "react";

export default function TJImage({ id, alt, className, src }) {
  const [imgSrc, setImageSrc] = useState(
    `https://tenso-japan.com/business/rest/product/image?id=${id}`
  );

  useEffect(() => {
    async function getImage() {
      try {
        const rsp = await fetch(
          `https://japanese-products.deno.dev/image/${id}`
        ).then((rsp) => rsp.json());
        // console.log("rsp", rsp?.resultBody?.data?.id);
        if (rsp?.resultBody?.data?.image)
          setImageSrc(rsp?.resultBody?.data?.image);
      } catch (e) {
        console.error(e);
      }
    }
    getImage();
  }, [id]);
  return <img src={imgSrc || src} alt={alt} className={className} />;
}
