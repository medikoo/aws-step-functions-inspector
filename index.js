"use strict";

const identity           = require("es5-ext/function/identity")
    , ensureObject       = require("es5-ext/object/valid-object")
    , ensureString       = require("es5-ext/object/validate-stringifiable-value")
    , pad                = require("es5-ext/string/#/pad")
    , capitalize         = require("es5-ext/string/#/capitalize")
    , clc                = require("cli-color/bare")
    , StepFunctions      = require("aws-sdk/clients/stepfunctions")
    , colorsSupportLevel = require("supports-color").stderr.level;

const cId = colorsSupportLevel ? clc.blackBright : identity
    , cDate = colorsSupportLevel ? clc.magenta : identity
    , cStep = colorsSupportLevel ? clc.green : identity
    , cDirection = colorsSupportLevel ? clc.blackBright : identity;

let currentStepName;

const dumpEventDetails = eventDetails => {
	const detailsKey = ["input", "output", "cause"].find(key => eventDetails[key]);
	const details = eventDetails[detailsKey];
	process.stdout.write(
		`${ cDirection(pad.call(capitalize.call(detailsKey), " ", 6)) }  ${ details }\n`
	);
};

const dumpEvent = event => {
	const eventDetailsKey = Object.keys(event).find(key => key.endsWith("Details"));
	const eventDetails = eventDetailsKey ? event[eventDetailsKey] : null;
	if (eventDetails && eventDetails.name) currentStepName = eventDetails.name;
	process.stdout.write(
		`${ [
			cId(pad.call(event.id, " ", 6)), cDate(event.timestamp.toISOString()),
			pad.call(event.type, " ", -25), cStep(currentStepName)
		].join("   ") }\n`
	);
	if (eventDetails) dumpEventDetails(eventDetails);
	process.stdout.write("\n");
};

const dump = async ({ stepFunctions, arn, reverseOrder, nextToken }) => {
	const result = await stepFunctions
		.getExecutionHistory({ executionArn: arn, reverseOrder, nextToken })
		.promise();
	result.events.forEach(dumpEvent);
	if (result.nextToken) {
		return dump({ stepFunctions, arn, reverseOrder, nextToken: result.nextToken });
	}
	return null;
};

module.exports = options => {
	ensureObject(options);
	const region = ensureString(options.region), arn = ensureString(options.arn);

	return dump({
		stepFunctions: new StepFunctions({ region }),
		arn,
		reverseOrder: options.reverse
	});
};
