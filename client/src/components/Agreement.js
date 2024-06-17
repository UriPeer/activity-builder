import React, { useEffect, useState } from "react";

const Agreement = ({ headerRef }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  window.addEventListener("resize", () => {
    setHeaderHeight(headerRef.current.offsetHeight);
  });

  useEffect(() => {
    setHeaderHeight(headerRef.current.offsetHeight);
  }, []);

  return (
    <div
      style={{
        marginTop: `${headerHeight + 10}px`,
        height: `calc(100vh - ${headerHeight + 10}px)`,
      }}
      className="user-agreement"
    >
      <h1 style={{ color: "#83abf8" }}>User Agreement</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        posuere eros mauris, nec semper sapien consectetur eget. Sed malesuada
        sem vitae urna accumsan, at ultricies nisi fringilla. Nulla facilisi.
        Morbi dapibus pulvinar quam, vitae aliquam elit commodo ac. Sed vel est
        eget tortor facilisis ultricies. Duis vel fringilla risus. Aliquam
        tempus venenatis dui, eu sagittis libero aliquet id. Proin interdum
        viverra erat at mattis. Vivamus fringilla purus vel est euismod, id
        ultricies neque tempor.
      </p>
      <p>
        Nam a eros semper, sollicitudin nulla in, ultrices dolor. Morbi lobortis
        purus justo, a ultricies erat ultrices at. Nullam a dolor at arcu
        pellentesque pharetra ut nec leo. In hac habitasse platea dictumst.
        Integer consectetur ligula ut justo pulvinar luctus. Fusce scelerisque
        massa eu feugiat sagittis. Nullam id suscipit urna. Aliquam ullamcorper
        nisi sed luctus consequat.
      </p>
      <p>
        Maecenas bibendum odio in tortor ultrices hendrerit. Nulla a arcu
        lacinia, pellentesque lacus vel, tincidunt ligula. Suspendisse potenti.
        Aenean quis enim sem. Donec a nulla et velit fringilla ultrices. Nam
        ultricies hendrerit dui ut tincidunt. Sed rhoncus luctus erat, id
        placerat risus finibus vitae. Donec venenatis, metus sit amet aliquam
        sagittis, dolor mi pharetra nisl, et vulputate est dui ac dui.
      </p>
      <p>
        Vestibulum efficitur felis ut purus mattis, ut dignissim purus finibus.
        Integer sed libero et enim mollis mattis. Vestibulum auctor tellus non
        arcu volutpat fringilla. Suspendisse laoreet eros sed mauris posuere
        ultricies. Nulla ut dui vestibulum, vehicula elit sed, cursus justo.
        Vestibulum nec sollicitudin odio, non tincidunt dolor. Mauris
        condimentum maximus purus, non cursus nibh tincidunt vitae. In lobortis,
        nunc vel dignissim pellentesque, nunc elit faucibus sapien, sit amet
        egestas urna sem ut sapien. Nullam a sollicitudin mi.
      </p>
      <p>
        Nunc consectetur elit ut turpis tincidunt vulputate. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Aliquam at urna quis elit ultrices ullamcorper. Quisque ut
        congue metus. Aliquam id massa lobortis, pulvinar justo at, cursus
        lectus. Sed eu justo quam. Morbi at pharetra tortor. Nullam tincidunt
        aliquet dolor, ac tempor neque molestie eget. Mauris eu metus eu dolor
        volutpat cursus eu in orci. Quisque rutrum tincidunt eleifend.
      </p>
      <p>
        Duis semper metus id sem ullamcorper vulputate. Aliquam erat volutpat.
        Curabitur et turpis non lorem interdum lacinia. Proin eget fermentum
        velit, eget tincidunt orci. Nullam eu metus tincidunt, commodo sapien
        id, posu
      </p>
    </div>
  );
};

export default Agreement;
