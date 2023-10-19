import { expect } from "chai";
import sns from "../src";
describe("testing 'index' file", () => {
  describe("'resolve' function", () => {
    it("should ok", async () => {
      expect(await sns.resolve("baiyu.seedao")).to.be.equal(
        "0x8C913aEc7443FE2018639133398955e0E17FB0C1",
      );
    });
    it("should return zero address when sns not exists", async () => {
      expect(await sns.resolve("notexist.seedao")).to.be.equal(
        "0x0000000000000000000000000000000000000000",
      );
      expect(await sns.resolve("")).to.be.equal(
        "0x0000000000000000000000000000000000000000",
      );
    });
    it("should return zero address when sns is sensitive", async () => {
      expect(await sns.resolve("vitalik.seedao")).to.be.equal(
        "0x0000000000000000000000000000000000000000",
      );
    });
    it("should return zero address when sns includes unsupported special char", async () => {
      expect(await sns.resolve("$abc.seedao")).to.be.equal(
        "0x0000000000000000000000000000000000000000",
      );
      expect(await sns.resolve("<abc.seedao")).to.be.equal(
        "0x0000000000000000000000000000000000000000",
      );
      expect(await sns.resolve("#abc.seedao")).to.be.equal(
        "0x0000000000000000000000000000000000000000",
      );
    });
  });
  describe("'resolves' function", () => {
    it("should ok", async () => {
      expect(
        await sns.resolves([
          "baiyu.seedao",
          "",
          "notexists.seedao",
          "vitalik.seedao",
          "$abc.seedao",
          "#abc.seedao",
        ]),
      ).to.eql([
        "0x8C913aEc7443FE2018639133398955e0E17FB0C1",
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
      ]);
    });
  });

  describe("'name' function", () => {
    it("should ok", async () => {
      expect(
        await sns.name("0x8C913aEc7443FE2018639133398955e0E17FB0C1"),
      ).to.be.equal("baiyu.seedao");
    });
    it("should return empty string when address is zero address", async () => {
      expect(
        await sns.name("0x0000000000000000000000000000000000000000"),
      ).to.be.equal("");
    });
    it("should return empty string when queried sns is sensitive", async () => {
      // 0xc1eE7cB74583D1509362467443C44f1FCa981283 's sns is vitalik.seedao
      expect(
        await sns.name("0xc1eE7cB74583D1509362467443C44f1FCa981283"),
      ).to.be.equal("");
    });
  });
  describe("'names' function", () => {
    it("should ok", async () => {
      expect(
        await sns.names([
          "0x8C913aEc7443FE2018639133398955e0E17FB0C1",
          "0x0000000000000000000000000000000000000000",
          "0xc1eE7cB74583D1509362467443C44f1FCa981283",
        ]),
      ).to.eql(["baiyu.seedao", "", ""]);
    });
  });
});
