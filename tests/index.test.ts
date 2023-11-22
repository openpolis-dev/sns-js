import { expect } from "chai";
import sns from "../src";

const indexerHost: string = "http://localhost:3000";
const safeHost: string = "http://localhost:8090";
const rpc: string =
  "https://eth-sepolia.g.alchemy.com/v2/H43zK7UnIN2v7u2ZoTbizIPnXkylKIZl";
const publicResolver: string = "0x4ffCfd37C362B415E4c4A607815f5dB6A297Ed8A";

describe("testing 'index' file", () => {
  describe("'resolve' function", () => {
    const tests: { name: string; sns: string; want: string }[] = [
      {
        name: "should ok",
        sns: "baiyu.seedao",
        want: "0x8C913aEc7443FE2018639133398955e0E17FB0C1",
      },
      {
        name: "should return zero address when sns not exists",
        sns: "notexist.seedao",
        want: "0x0000000000000000000000000000000000000000",
      },
      {
        name: "should return zero address when sns not exists",
        sns: "",
        want: "0x0000000000000000000000000000000000000000",
      },
      {
        name: "should return zero address when sns is sensitive",
        sns: "vitalik.seedao",
        want: "0x0000000000000000000000000000000000000000",
      },
      {
        name: "should return zero address when sns includes unsupported special char",
        sns: "$abc.seedao",
        want: "0x0000000000000000000000000000000000000000",
      },
      {
        name: "should return zero address when sns includes unsupported special char",
        sns: "<abc.seedao",
        want: "0x0000000000000000000000000000000000000000",
      },
      {
        name: "should return zero address when sns includes unsupported special char",
        sns: "#abc.seedao",
        want: "0x0000000000000000000000000000000000000000",
      },
    ];

    it("Query Indexer Success", async () => {
      for (const tt of tests) {
        it(tt.name, async () => {
          expect(
            await sns._r(tt.sns, safeHost, indexerHost, "", ""),
          ).to.be.equal(tt.want);
        });
      }
    });

    it("Query Contract Success", async () => {
      for (const tt of tests) {
        it(tt.name, async () => {
          expect(
            await sns._r(tt.sns, safeHost, "", rpc, publicResolver),
          ).to.be.equal(tt.want);
        });
      }
    });
  });

  describe("'resolves' function", () => {
    const snsArr: string[] = [
      "baiyu.seedao",
      "",
      "notexists.seedao",
      "vitalik.seedao",
      "$abc.seedao",
      "#abc.seedao",
    ];
    const wantArr: string[] = [
      "0x8C913aEc7443FE2018639133398955e0E17FB0C1",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
    ];
    it("Query Indexer Success", async () => {
      expect(await sns._rs(snsArr, safeHost, indexerHost, "", "")).to.eql(
        wantArr,
      );
    });

    it("Query Contract Success", async () => {
      expect(await sns._rs(snsArr, safeHost, "", rpc, publicResolver)).to.eql(
        wantArr,
      );
    });
  });

  describe("'name' function", () => {
    const tests: { name: string; addr: string; want: string }[] = [
      {
        name: "should ok",
        addr: "0x8C913aEc7443FE2018639133398955e0E17FB0C1",
        want: "baiyu.seedao",
      },
      {
        name: "should return empty string when address is zero address",
        addr: "0x0000000000000000000000000000000000000000",
        want: "",
      },
      {
        name: "should return empty string when queried sns is sensitive",
        // 0xc1eE7cB74583D1509362467443C44f1FCa981283 's sns is vitalik.seedao
        addr: "0xc1eE7cB74583D1509362467443C44f1FCa981283",
        want: "",
      },
    ];

    it("Query Indexer Success", async () => {
      for (const tt of tests) {
        it(tt.name, async () => {
          expect(
            await sns._n(tt.addr, safeHost, indexerHost, "", ""),
          ).to.be.equal(tt.want);
        });
      }
    });

    it("Query Contract Success", async () => {
      for (const tt of tests) {
        it(tt.name, async () => {
          expect(
            await sns._n(tt.addr, safeHost, "", rpc, publicResolver),
          ).to.be.equal(tt.want);
        });
      }
    });
  });

  describe("'names' function", () => {
    const addrArr: string[] = [
      "0x8C913aEc7443FE2018639133398955e0E17FB0C1",
      "0x0000000000000000000000000000000000000000",
      "0xc1eE7cB74583D1509362467443C44f1FCa981283",
    ];
    const wantArr: string[] = ["baiyu.seedao", "", ""];

    it("Query Indexer Success", async () => {
      expect(await sns._ns(addrArr, safeHost, indexerHost, "", "")).to.eql(
        wantArr,
      );
    });

    it("Query Contract Success", async () => {
      expect(await sns._ns(addrArr, safeHost, "", rpc, publicResolver)).to.eql(
        wantArr,
      );
    });
  });
});
