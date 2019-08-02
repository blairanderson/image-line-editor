import React from "react";
import ReactDOM from "react-dom";
import { uniqBy } from "ramda";
import Drop from "./Drop";
import DimensionDrawer from "./DimensionDrawer";

const getFileKey = f => `${f.name}_${f.size}`;

class App extends React.Component {
  state = { accepted: [], dragOverStatus: null };
  ref = React.createRef();

  onDrop = acceptedFiles => {
    const accepted = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );

    this.setState(state => ({
      accepted: uniqBy(getFileKey, state.accepted.concat(accepted))
    }));
  };

  resetAccepted() {
    this.state.accepted.forEach(f => {
      window.URL.revokeObjectURL(f.preview);
    });
    this.setState({ accepted: [] });
  }

  componentWillUnmount() {
    this.resetAccepted();
  }

  render() {
    return (
      <section>
        <h2 style={{ textAlign: "center" }}>
          Upload an Image. Draw Lines on It.
        </h2>
        {this.state.accepted.length === 0 ? (
          <RenderDroper ref={this.ref} onDrop={this.onDrop} />
        ) : (
          <div>
            <button
              onClick={e => {
                this.resetAccepted();
              }}
            >
              reset
            </button>
          </div>
        )}

        <div>
          {this.state.accepted.map(f => (
            <div
              style={{
                height: "100vh",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
              key={f.name}
            >
              {f.name} <DimensionDrawer {...f} />
            </div>
          ))}
        </div>
      </section>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

function RenderDroper({ ref, onDrop }) {
  return (
    <div className="dropzone">
      <Drop
        ref={ref}
        accept="image/jpeg, image/png"
        onDrop={onDrop}
        onDragOver={(...args) => {
          console.log("onDragOver args", [...args]);
        }}
      >
        <p>Place the file here that you would like to edit.</p>
      </Drop>
    </div>
  );
}
