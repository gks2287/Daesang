기업 CI 로고 파일 디렉토리
==========================

파일명 규칙: {slug}.png  (또는 {slug}.svg)

예시:
  lgchem.png       (LG화학)
  mobis.png        (현대모비스)
  skhynix.png      (SK하이닉스)
  posco.png        (포스코)
  samsungsdi.png   (삼성SDI)
  ktng.png         (KT&G)
  lottechem.png    (롯데케미칼)
  doosan.png       (두산에너빌리티)

SVG도 사용 가능합니다. 같은 slug 로 .svg 파일을 추가할 수 있습니다.
  (예: lgchem.svg)

slug 값은 components/CompanyLogo.tsx 의 COMPANY_META 에 정의되어 있습니다.

이미지 적용 순서 (앞에서 실패하면 다음으로 fallback):
  1순위) /logos/{slug}.png  (이 디렉토리의 로컬 png)
  2순위) /logos/{slug}.svg  (png 없을 때 svg)
  3순위) 텍스트 아바타 (브랜드 컬러 배경 + 이니셜 라벨)

따라서 파일을 추가하지 않아도 화면은 정상 동작합니다.
컨테이너는 둥근 사각형(rounded-lg) + 흰 배경 + 안쪽 여백으로,
가로형 CI 로고도 잘리지 않고 비율 유지(object-contain)되어 표시됩니다.
