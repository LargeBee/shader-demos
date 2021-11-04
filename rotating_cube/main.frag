/*
    Borrowed from https://www.shadertoy.com/view/MlcGDB
    uv Normalized coordinates from main func
    p1 Position 1 to draw the line from
    p2 Position 2 to draw the line to
    t  Thickness of the line
*/
float line(vec2 uv, vec2 p1, vec2 p2, float t) 
{
    vec2 g = p2 - p1;
    vec2 h = uv - p1;
    float d = length(h - g * clamp(dot(g, h) / dot(g,g), 0.0, 1.0));
	return smoothstep(t, 0.5*t, d);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    //Normalize coordinates to values 0 -> 1
    vec2 uv = fragCoord/iResolution.xy; //0 -> 1

    //Map centre to origin
    uv -= 0.5;                           //-0.5 -> 0.5

    //Multiply uv.x by aspect ratio of screen
    uv.x *= iResolution.x/iResolution.y;

    //Define set of points
    vec3 points[] = vec3[](
    vec3(-1.0,-1.0,-1.0),
    vec3(-1.0,1.0,-1.0),

    vec3(1.0,-1.0,-1.0),
    vec3(1.0,1.0,-1.0),

    vec3(1.0,-1.0,1.0),
    vec3(-1.0,-1.0,1.0),
    
    vec3(-1.0,1.0,1.0),
    vec3(1.0,1.0,1.0)
    );
    //rotate points with matrix maths and use time as angle
    //Draw lines between points
    

    //Output colour per pixel
    fragColor = vec4(vec3(1.0), 1.0);
}