import * as adapters				from "awayjs-display/lib/adapters";
import * as animators				from "awayjs-display/lib/animators";
import * as base					from "awayjs-display/lib/base";
import * as bounds					from "awayjs-display/lib/bounds";
import * as controllers				from "awayjs-display/lib/controllers";
import * as display					from "awayjs-display/lib/display";
import * as draw					from "awayjs-display/lib/draw";
import * as errors					from "awayjs-display/lib/errors";
import * as events					from "awayjs-display/lib/events";
import * as factories				from "awayjs-display/lib/factories";
import * as graphics				from "awayjs-display/lib/graphics";
import * as managers				from "awayjs-display/lib/managers";
import * as materials				from "awayjs-display/lib/materials";
import * as partition				from "awayjs-display/lib/partition";
import * as pick					from "awayjs-display/lib/pick";
import * as prefabs					from "awayjs-display/lib/prefabs";
import * as text					from "awayjs-display/lib/text";
import * as textures				from "awayjs-display/lib/textures";
import * as utils					from "awayjs-display/lib/utils";
import IRenderer					from "awayjs-display/lib/IRenderer";
import ITraverser					from "awayjs-display/lib/ITraverser";
import View							from "awayjs-display/lib/View";

partition.PartitionBase.registerAbstraction(partition.CameraNode, display.Camera);
partition.PartitionBase.registerAbstraction(partition.DirectionalLightNode, display.DirectionalLight);
partition.PartitionBase.registerAbstraction(partition.EntityNode, display.Sprite);
partition.PartitionBase.registerAbstraction(partition.EntityNode, display.Shape);
partition.PartitionBase.registerAbstraction(partition.EntityNode, display.MovieClip);
partition.PartitionBase.registerAbstraction(partition.EntityNode, display.Billboard);
partition.PartitionBase.registerAbstraction(partition.EntityNode, display.LineSegment);
partition.PartitionBase.registerAbstraction(partition.EntityNode, display.TextField);
partition.PartitionBase.registerAbstraction(partition.LightProbeNode, display.LightProbe);
partition.PartitionBase.registerAbstraction(partition.PointLightNode, display.PointLight);
partition.PartitionBase.registerAbstraction(partition.SkyboxNode, display.Skybox);

export {
	adapters,
	animators,
	base,
	bounds,
	controllers,
	display,
	draw,
	errors,
	events,
	factories,
	graphics,
	managers,
	materials,
	partition,
	pick,
	prefabs,
	text,
	textures,
	utils,
	IRenderer,
	ITraverser,
	View
}

