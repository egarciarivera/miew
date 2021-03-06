# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.7.3] - 2017-10-02
### Added
- Add functional tests for parsing PDB, CIF, MMTF, PubChem, CCP4.
- Add automatic deployment to a tomcat server via SSH.

### Changed
- Mark GLY residue as a `nonpolar` one.
- Extract PDBStream as a separate module.
- Specify supported browsers list explicitly in `package.json`.
- Use `env` Babel preset as recommended by authors.
- Configure webpack to produce multiple chunks for better caching.
- Upgrade to Yarn v1.0.2, update other dependencies.

### Fixed
- Fix parsing of CCP4 files with symmetry operations stored.
- Fix parsing of CCP4 files from a typed array.
- Take volumetric data into account when calculating a bounding box and centering on the screen.
- Fix volume faces and add a plane for correct volumetric rendering during zoom.
- Resolve some minor issues found by Sonar.
- Make NPM package public.

## [0.7.2] - 2017-09-19
### Added
- Add integration with online services: Travis CI, AppVeyor, Coveralls, CodeClimate, SonarCloud, BitHound.
- Add automatic tagged version deployment to NPM.
- Add a code of conduct.

### Changed
- Use Jmol secondary structure colors for DNA and RNA, shades of pink instead of light gray.
- Change `rep <idx>` command behavior in the case when the specified representation is missing.
- Use `babel-polyfill` to support ES6 features (Promises and `Number.isNaN` at the moment).
  The polyfill is not included in the library build, use any implementation you'd like.
- Upgrade to jQuery 3.
- Update dependencies to the latest supported versions.

## 0.7.1 - 2017-09-06
### Changed
- Update dependencies to the latest supported versions.
- Move the project to GitHub.

[Unreleased]: https://github.com/epam/miew/compare/v0.7.3...HEAD
[0.7.3]: https://github.com/epam/miew/compare/v0.7.2...v0.7.3
[0.7.2]: https://github.com/epam/miew/compare/v0.7.1...v0.7.2
