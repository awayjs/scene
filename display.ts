import Camera						= require("awayjs-display/lib/display/Camera");
import DirectionalLight				= require("awayjs-display/lib/display/DirectionalLight");
import Sprite						= require("awayjs-display/lib/display/Sprite");
import Billboard					= require("awayjs-display/lib/display/Billboard");
import LineSegment					= require("awayjs-display/lib/display/LineSegment");
import TextField					= require("awayjs-display/lib/display/TextField");
import PointLight					= require("awayjs-display/lib/display/PointLight");
import LightProbe					= require("awayjs-display/lib/display/LightProbe");
import Skybox						= require("awayjs-display/lib/display/Skybox");
import Shape						= require("awayjs-display/lib/display/Shape");
import MovieClip					= require("awayjs-display/lib/display/MovieClip");
import CameraNode					= require("awayjs-display/lib/partition/CameraNode");
import DirectionalLightNode			= require("awayjs-display/lib/partition/DirectionalLightNode");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import LightProbeNode				= require("awayjs-display/lib/partition/LightProbeNode");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import PointLightNode				= require("awayjs-display/lib/partition/PointLightNode");
import SkyboxNode					= require("awayjs-display/lib/partition/SkyboxNode");

PartitionBase.registerAbstraction(CameraNode, Camera);
PartitionBase.registerAbstraction(DirectionalLightNode, DirectionalLight);
PartitionBase.registerAbstraction(EntityNode, Sprite);
PartitionBase.registerAbstraction(EntityNode, Shape);
PartitionBase.registerAbstraction(EntityNode, MovieClip);
PartitionBase.registerAbstraction(EntityNode, Billboard);
PartitionBase.registerAbstraction(EntityNode, LineSegment);
PartitionBase.registerAbstraction(EntityNode, TextField);
PartitionBase.registerAbstraction(LightProbeNode, LightProbe);
PartitionBase.registerAbstraction(PointLightNode, PointLight);
PartitionBase.registerAbstraction(SkyboxNode, Skybox);



/**
 *
 * static shim
 */
class display
{

}

export = display;