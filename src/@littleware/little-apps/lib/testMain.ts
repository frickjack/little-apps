import AppContext from "../../../../@littleware/little-elements/web/lib/appContext/appContext.js";
import { loadConfig } from "../../../../@littleware/little-elements/web/lib/appContext/simpleLoader.js";
import { startTest } from "../../../../@littleware/little-elements/web/lib/test/util.js";
import "./511/spec/511Spec.js";
import "./headerSimple/spec/headerSimpleSpec.js";
import "./jwt/spec/jwtSpec.js";

/**
 * Initialize appcontext directly rather than via
 * lw-app-context custom element to simplify karmajs
 * integration
 */
AppContext.build({ configHref: [], loadConfig }).then(
    (cx) => cx.start(),
).then(
    () => startTest(),
);
