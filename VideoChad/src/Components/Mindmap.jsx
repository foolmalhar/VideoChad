import React, {useRef} from 'react'
import ForceGraph3D from '3d-force-graph';
import SpriteText from 'three-spritetext';

function genRandomTree(N = 9000, reverse = false) {
    return {
      nodes: [...Array(N).keys()].map((i) => ({ id: i })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          [reverse ? "target" : "source"]: id,
          [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1))
        }))
    };
  }
const Mindmap = () => {
    const fgRef = useRef();


    const data = genRandomTree();
    return (
        <div>

      {/* if data available then only render */}


      {data && (
        <ForceGraph3D
          ref={fgRef}
          graphData={data}
            nodeAutoColorBy="group"
        />
        )}
         </div>
    );
   };
   
export default Mindmap;