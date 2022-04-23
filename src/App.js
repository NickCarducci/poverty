import React from "react";
//import TwitterTweetEmbed from "./TwitterTweetEmbed";
import { UAParser } from "ua-parser-js";
import Cable from "./Dropwire";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    var parser = new UAParser();
    const name = parser.getBrowser().name;
    console.log(name);
    this.state = {
      trigger: false,
      browser: name,
      scrollTop: 0,
      serviceCancelingImages: name.includes("Safari")
    };
    for (let i = 0; i < 220; i++) {
      this["scrollImg" + i] = React.createRef();
    }
  }
  componentDidMount = () => {
    window.addEventListener("resize", this.refresh);
    window.addEventListener("scroll", this.handleScroll);
    this.refresh(true);
  };
  componentWillUnmount = () => {
    clearTimeout(this.check);
    clearTimeout(this.scrollTimeout);
    clearTimeout(this.resizeTimer);
    window.removeEventListener("resize", this.refresh);
    window.removeEventListener("scroll", this.handleScroll);
  };
  handleScroll = (e) => {
    if (!this.state.offScroll) {
      const scrollTop = window.scrollY;
      this.setState(
        {
          scrolling: true,
          scrollTop
        },
        () => {
          clearTimeout(this.scrollTimeout);
          this.scrollTimeout = setTimeout(() => {
            this.setState({
              scrolling: false
            });
          }, 900);
        }
      );
    }
  };
  refresh = (first) => {
    const width =
      (this.state.ios ? window.screen.availWidth : window.innerWidth) - 20;
    if (first || Math.abs(this.state.lastWidth - width) > 0) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.setState({
          lastWidth: width,
          width,
          availableHeight: this.state.ios
            ? window.screen.availHeight - 20
            : window.innerHeight
        });
      }, 600);
    }
  };
  componentDidUpdate = (prevProps) => {
    if (this.props.pathname !== prevProps.pathname) {
      clearTimeout(this.check);
      const check = () => {
        if (this.props.pathname !== "/") {
          this.setState({ trigger: true });
        }
        if (this.props.pathname === "/edu") {
          //  window.scroll(0, this.edu.current.offsetTop);
        }
      };
      check();
      this.check = setTimeout(check, 4000);
    }
  };
  render() {
    const handleScollImgError = (e) => {
      if (e.message) {
        console.log(e.message);
        this.setState({ serviceCancelingImages: true });
      }
    };
    let arrayOfnumbers = 0;
    const scrollnum = () => {
      arrayOfnumbers = arrayOfnumbers + 1; //arrayOfnumbers[arrayOfnumbers.length - 1] + 1;
      //arrayOfnumbers.push(num);
      //console.log(arrayOfnumbers)
      return arrayOfnumbers;
    };
    const space = " ";
    return (
      <div
        style={{
          overflow: "hidden",
          //margin: "5px",
          fontFamily: "arial, sans serif",
          wordBreak: "break-word",
          textAlign: "left",
          width: "100%",
          maxWidth: "600px",
          position: "relative"
        }}
      >
        {/*<Cable
          style={{ width: "200px" }}
          onError={handleScollImgError}
          img={true}
          src={
            this.state.noyout
              ? ""
              : "https://www.dropbox.com/s/sqf6c2uuuf4kjzg/Screen%20Shot%202022-03-17%20at%201.39.57%20PM.png?raw=1"
          }
          float={"left"}
          title="The Future of Medicine: Legislation to Encourage Innovation and Improve Oversight (Energy and Commerce Committee, Youtube) - https://youtu.be/Oiy0aFXyKzU"
          scrolling={this.state.scrolling}
          fwd={this["scrollImg" + scrollnum()]}
          scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
          scrollTop={this.state.scrollTop}
        />*/}
        <h4>
          <a href="https://disabilities.quora.com/Did-slavery-cause-inflation-1">
            Did slavery cause inflation
          </a>
          ?{space}&bull;{space}
          <a href="https://disabilities.quora.com/Is-having-no-money-for-retirement-a-self-inflicted-wound">
            Is having no money for retirement a self-inflicted wound
          </a>
          ?
        </h4>
        Imputed slavery shows that all income is discretionary expense, or the
        trade was in house and unrecorded, eating the inventory or unreported
        non-food plantation to food plantation.
        <br />
        poverty rate (income DURING expense, truncated
        skew/outliers-notwithstanding, "wealth inequality," not gini wealth
        inequality, "income inequality")
        <br />
        less income* than third despondency of expense (around)
        <br />
        *during, AFTER:{space}
        <a href="https://realecon.quora.com/https-www-quora-com-Are-labour-markets-in-the-rich-world-too-tight-3-answer-Nick-Carducci">
          Are labour markets in the rich world too tight
        </a>
        ?
        <br />
        <br />
        Or, leisure upsidedown with "value-added" imputed by *1.2 (plus
        mortgage) to hide ascertainable harm of insurance presentation in{space}
        <a href="https://saverparty.xyz/poverty">Healthcare</a>?
      </div>
    );
  }
}
