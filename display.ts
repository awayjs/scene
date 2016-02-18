import Camera						= require("awayjs-display/lib/entities/Camera");
import DirectionalLight				= require("awayjs-display/lib/entities/DirectionalLight");
import Mesh							= require("awayjs-display/lib/entities/Mesh");
import Billboard					= require("awayjs-display/lib/entities/Billboard");
import LineSegment					= require("awayjs-display/lib/entities/LineSegment");
import TextField					= require("awayjs-display/lib/entities/TextField");
import PointLight					= require("awayjs-display/lib/entities/PointLight");
import LightProbe					= require("awayjs-display/lib/entities/LightProbe");
import Skybox						= require("awayjs-display/lib/entities/Skybox");
import CameraNode					= require("awayjs-display/lib/partition/CameraNode");
import DirectionalLightNode			= require("awayjs-display/lib/partition/DirectionalLightNode");
import EntityNode					= require("awayjs-display/lib/partition/EntityNode");
import LightProbeNode				= require("awayjs-display/lib/partition/LightProbeNode");
import PartitionBase				= require("awayjs-display/lib/partition/PartitionBase");
import PointLightNode				= require("awayjs-display/lib/partition/PointLightNode");
import SkyboxNode					= require("awayjs-display/lib/partition/SkyboxNode");

PartitionBase.registerAbstraction(CameraNode, Camera);
PartitionBase.registerAbstraction(DirectionalLightNode, DirectionalLight);
PartitionBase.registerAbstraction(EntityNode, Mesh);
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