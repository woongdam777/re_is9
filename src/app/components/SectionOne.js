// components/SectionOne.js
import IconLink from './IconLink';

export default function SectionOne() {
  return (
    <section id="section-one" className="section-one">
      <div className="input-container">
        <h1>링크 모음</h1>
        <ul className="icon-frame">
          <IconLink href="https://open.kakao.com/o/gLJTviYf" iconClass="icon-talk" text="오픈톡방" />
          <IconLink href="https://cafe.naver.com/dfgad" iconClass="icon-cafe" text="공식카페" />
          <IconLink href="https://m16tool.xyz/Game/IS9RE" iconClass="icon-tool" text="M16Tool" />
          <IconLink href="https://discord.com/invite/t4MyVH4nAu" iconClass="icon-discord" text="디스코드" />
        </ul>
        <h1>매크로 및 툴 모음</h1>
        <ul className="icon-frame">
          <IconLink href="/public/file/Cirnix.exe" iconClass="icon-cirnix" text="치르닉스" />
          <IconLink href="/public/file/IMax.zip" iconClass="icon-imax" text="IMax매크로" />
          <IconLink href="/public/file/inActive_G_macro.zip" iconClass="icon-g" text="비활G매크로" />
          <IconLink href="https://blog.naver.com/pg365/223008100384" iconClass="icon-key" text="key매크로" />
        </ul>
      </div>
    </section>
  );
}